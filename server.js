const app = require("./src/app");
const {app : {port}} = require('./src/configs/configMongodb')

const PORT = port || 3055

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

process.on('SIGINT', () => {
    server.close(() => console.log('server is exit'))
})

