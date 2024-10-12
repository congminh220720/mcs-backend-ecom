'use strict'

const keyTokenModel = require("../models/keyToken.model")
const mongoose = require('mongoose')

class KeyTokenService {
  static CreateKeyToken = async ({userId,publicKey,privateKey, refreshToken}) => {
      try {
        // lv 0
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

        const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
        console.log(tokens)
        return tokens ? tokens?.publicKey : null

      } catch (e) {
          return e
      }
  }
    
  static findByUserId = async ( userId ) => {
    return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId)}).lean()
  } 

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne({ _id: id })
  }

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({refreshTokenUsed:refreshToken}).lean()
  }

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({refreshToken})
  }

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.deleteOne({ user: new mongoose.Types.ObjectId(userId)})
  }

}

module.exports = KeyTokenService