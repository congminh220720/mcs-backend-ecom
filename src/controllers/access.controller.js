'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req,res,next) => {
            new CREATED({
                message: 'Registered OK !',
                metadata: await AccessService.signUp(req.body),
                options: {
                    limit: 10
                }
            }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    handlerRefreshToken = async (req,res,next) => {
        new SuccessResponse({
            message: 'Get token success!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
        }).send(res)
    }
}

module.exports = new AccessController()