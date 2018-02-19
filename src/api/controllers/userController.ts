import { Request, Response, NextFunction } from 'express'

import bcrypt = require('bcrypt')
import jwt =require('jsonwebtoken')

import dotenv = require('dotenv')
const environ = dotenv.config({ path: './variables.env'})
if(environ.error) {
    throw environ.error
}

import User from '../models/userModel'

const controller = {
  signup: async(req: Request, res: Response, next: NextFunction) => {
      const email: string = req.body.email

      const user = User
        .find({ email })
        .then(user => {
            if(user.length >= 1) {
                return res
                    .status(409)
                    .json({
                        message: "Mail already exists"
                    })
            } else {
                bcrypt.hash(req.body.password, 10, (err: Error, hash: string) => {
                    if(err) {
                        return res
                            .status(500)
                            .json({
                                error: err
                            })
                    } else {
                        const user = new User({
                            // _id: new mongoose.Types.ObjectId(),
                            email: email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res
                                    .status(201)
                                    .json({
                                        message: "User created"
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                res
                                    .status(500)
                                    .json({
                                        error: err
                                    })
                            })
                    }
                })
            }
        })
  },
  login: async(req: Request, res: Response, next: NextFunction) => {
      const email: string = req.body.email
      const user = User
        .find({ email })
        .then(user => {
            console.log(`This is login: ${user}`)
            // Verificando que no se encontró email
            if(user.length < 1) {
                return res
                    .status(401)
                    .json({
                        message: "Auth failed"
                    })
            }
            bcrypt.compare(req.body.password, user[0]['password'], (err:Error, result: Boolean) => {
                if(err) {
                    return res
                        .status(401)
                        .json({
                            message: "Auth failed"
                        })
                }
                if(result) {
                    const token: string = jwt.sign({
                        email: user[0]['email'],
                        userId: user[0]['_id']
                    }, process.env.MYKEY, {
                        expiresIn: "1h"
                    })
                    return res
                        .status(200)
                        .json({
                            message: "Auth successfully",
                            token
                        })
                }
                res
                    .status(401)
                    .json({
                        message: "Auth failed"
                    })
            })
        })
        .catch(err =>{
            console.log(err)
            res
                .status(500)
                .json({
                    error: err
                })
        })
  },

  delete: async(req: Request, res: Response, next: NextFunction) => {
      const id: string = req.params.userId
      const user = User
        .remove({ _id: id })
        .then(result => {
            console.log(result)
            res
                .status(200)
                .json({
                    message: "User deleted"
                })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    error: err
                })
        })
  }
}

export { controller }
