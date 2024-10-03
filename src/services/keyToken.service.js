'use strict'

const keyTokenModel = require("../models/keyToken.model")

class KeyTokenService {
    static CreateKeyToken = async ({userId,publicKey,privateKey, refreshToken}) => {
        try {
          // const publicKeyString =  publicKey.toString()
          // const tokens = await keyTokenModel.create({
          //   user: userId,
          //   publickey: publicKeyString
          // })

          // return tokens ? tokens?.publickey : null

          const filter = {
            user: userId
          }, update = {
            publicKey, privateKey, refreshTokenUsed: [], refreshToken
          }, options = { upsert: true, new: true}

          const tokens = await keyTokenModel.findByIdAndUpdate({filter, update, options})

        } catch (e) {
            return e
        }
    }
}

module.exports = KeyTokenService