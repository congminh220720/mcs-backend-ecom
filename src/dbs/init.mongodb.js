'use strict'
const {db : {host, port, name}} = require('../configs/configMongodb')
const mongoose = require('mongoose')
const CONNECT_STRING = `mongodb://${host}:${port}/${name}`
// const CONNECT_STRING = `mongodb://localhost:27017/shopDEV`
console.log(CONNECT_STRING)

class Database {
    constructor() {
        this.connect()
    }

    connect (type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(CONNECT_STRING, {maxPoolSize:50})
        .then(_ => console.log('Connected Mongodb success'))
        .catch(_ => console.log('Connect Mongodb Fail', _))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb