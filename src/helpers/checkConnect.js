'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

// count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log('number of connection:', numConnection)
}

// check over load connect 
const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        // Example maximum number of connection based on number os cores !
        const maximumConnections = numCores * 5

        if (numConnection > maximumConnections) {
            console.log('connection overload detected')
        }
        
    }, _SECONDS)
}

module.exports = {
    countConnect,
    checkOverLoad
}