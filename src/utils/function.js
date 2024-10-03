const crypto = require('crypto')


const generateKey = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki', // Recommended for public key encoding
            format: 'pem' // PEM format
        },
        privateKeyEncoding: {
            type: 'pkcs8', // Recommended for private key encoding
            format: 'pem' // PEM format
        }
    })

    return { privateKey, publicKey }
}

module.exports = {
    generateKey
}