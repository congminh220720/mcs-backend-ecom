const develop = {
    app: {
        port: process.env.DEV_APP_PORT || 3055
    },
    db: {
        port: process.env.DEV_DB_PORT || 27017,
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        name:process.env.DEV_DB_NAME || 'shopDEV'
    }
}

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 8089
    },
    db: {
        port: process.env.PRO_DB_PORT || 27017,
        host: process.env.PRO_DB_HOST || '127.0.0.1',
        name:process.env.PRO_DB_NAME || 'shopPRO'
    }
}

const config = { develop, production }
const env = process.env.NODE_ENV || 'production'
console.log(config[env], env)

module.exports = config[env]
// mongodb://localhost:27017/shopDEV
//mongodb://localhost:27017/shopPRO