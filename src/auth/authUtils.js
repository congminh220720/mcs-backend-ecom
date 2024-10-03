'use strict'

const JWT = require('jsonwebtoken')

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

module.exports = {
    createTokenPair
}