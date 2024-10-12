'use strict'

const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id'
}


const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        JWT.verify(accessToken,publicKey, { algorithms: ['RS256'] }, (error, decoded) =>{
            if (error) {
                console.log(`verify :: error ${error}`)
            } else {
                console.log(`verify success::: ${decoded}`)
            }
        })

        return { accessToken, refreshToken }
    } catch (e) {
        console.log(e)
    }
}

const authentication = asyncHandler( async (req,res,next) => {
    let userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailureError('Invalid Request')
    const keyStore = await findByUserId(userId)

    if (!keyStore) throw new NotFoundError('Not found keyStore')
       
    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if (!accessToken) throw new AuthFailureError('Invalid Request')

    try {
        const decodedUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid User Id')
        req.keyStore = keyStore
        return next()
    } catch (e) {
        throw e
    }
})

const verifyJWT = async (token, keySecret) => {
    return JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}