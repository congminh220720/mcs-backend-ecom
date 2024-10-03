'use strict'
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const shopModel = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError, AuthFailureError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')
const { generateKey } = require('../utils/function')


const shopRole = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static login = async ({email, password, refreshToken = null}) => {
        const foundShop = await findByEmail({email})
        if (!foundShop) throw new BadRequestError('Shop not registered')    

        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new AuthFailureError('Authentication error')
            
        const { privateKey, publicKey } = generateKey()
        const tokens = await createTokenPair({userId:foundShop._id, email }, publicKey, privateKey)


        await KeyTokenService.CreateKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey,userId:foundShop._id
        })

        return {
            shop: getInfoData({ fileds: ['_id', 'name', 'email', 'password'], object: foundShop}),
            tokens
        }


    }

    static signUp = async ({name, password, email}) =>{
            const holerShop = await shopModel.findOne({email}).lean()
            if (holerShop) {
               throw new BadRequestError('Shop already registered')
            }

            const passwordHas = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name, email, password: passwordHas, roles: [shopRole.SHOP]
            })

            if (newShop) {
                const { privateKey, publicKey } = generateKey()

                const publicKeyString = await KeyTokenService.CreateKeyToken({
                    userId: newShop._id,
                    publicKey: publicKey
                })

                const publicKeyObject = crypto.createPublicKey(publicKeyString)

                if (!publicKeyString) {
                    throw new BadRequestError('publicKeyString')
                }

                // create pair token 
                const payload = {
                    email: email,
                    userId: newShop._id
                }
                const tokens = await createTokenPair(payload, publicKeyObject, privateKey)

                return {
                    code: 201,
                    shop: getInfoData({ fileds: ['_id', 'name', 'email', 'password'], object: newShop}),
                    tokens
                }
            }

            return {
                code: 200,
                metadata:null
            }
    }

}   

module.exports = AccessService