import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

import dotenv = require('dotenv')
const environ: dotenv.DotenvResult = dotenv.config({ path: './variables.env'})
if(environ.error) {
    throw environ.error
}

function checkAuth(req, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.authorization.split(" ")[1]
        const decoded: string = jwt.verify(token, process.env.MYKEY)        
        req.userData = decoded
        next()
    } catch(error) {
        console.log(error)
        return res
            .status(401)
            .json({
                message: "Auth failed"
            })
    }
}

export { checkAuth }
