import { Request, Response, NextFunction } from 'express'
// Complementa body-parser para el manejo de datos externos
// const multer = require('multer')

import Product from '../models/productModel'

// // Estableciendo multer
// const storage = multer.diskStorage({
//     destination: (req: Request, file: any, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req: Request, file: any, cb) => {
//         cb(null, new Date().toISOString() + file.originalName)
//     }
// })
//
// const fileFilter = (req: Request, file: any, cb) => {
//     // Reject a file by mimetype
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
//
// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter
// })

const controller = {
    list: async (req: Request, res: Response, next: NextFunction) => {
        const product = Product
            .find({})
            .select('name price productImage _id')
            .then(docs => {
                const response = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc['name'],
                            price: doc['price'],
                            productImage: doc['productImage'],
                            _id: doc['_id'],
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/' + doc['_id']
                            }
                        }
                    })
                }

                if (docs.length >= 1) {
                    res
                        .status(200)
                        .json(response)
                } else {
                    res
                        .status(404)
                        .json({
                            message: "No entries found"
                        })
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        error: err
                    })
            })
    },

    add: async (req: Request, res: Response, next: NextFunction) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        })

        product
            .save()
            .then(result => {
                res
                    .status(201)
                    .json({
                        message: "Created product successfully",
                        createdProduct: {
                            name: result['name'],
                            price: result['price'],
                            productImage: result['productImage'],
                            _id: result['_id'],
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/' + result['_id']
                            }
                        }
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
    },

    detail: async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.productId

        const product = Product
            .findById(id)
            .select('name price productImage _id')
            .then(doc => {
                console.log("From database:", doc)
                if (doc) {
                    res
                        .status(200)
                        .json({
                            product: doc,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/'
                            }
                        })
                } else {
                    res
                        .status(404)
                        .json({
                            message: "Not valid entry found for provided ID"
                        })
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        error: err
                    })
            })
    },

    edit: async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.productId

        const updateOps = {}

        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value
        }

        const product = Product
            .update(
            { _id: id },
            { $set: updateOps }
            )
            .then(result => {
                res
                    .status(200)
                    .json({
                        message: "Product Updated",
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/product/' + id
                        }
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
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.productId

        const product = Product
            .remove({ _id: id })
            .then(result => {
                res
                    .status(200)
                    .json({
                        message: "Product deleted",
                        request: {
                            type: 'POST',
                            url: 'http://localhost:4000/products/',
                            body: { name: 'String', price: 'Number' }
                        }
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
