'use strict'
const {Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

var keyTokenSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        require: true,
        ref:'Shop'
    },
    publickey: {
        type: String,
        require: true
    },
    refreshTokenUsed: {
        type: Array,
        default: [] 
    },
    refreshToken: {
        type: String,
        required: true
    }
},{
    collection: COLLECTION_NAME,
    timestamp: true
})

module.exports = model(DOCUMENT_NAME,keyTokenSchema)