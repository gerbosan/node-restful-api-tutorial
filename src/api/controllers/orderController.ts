import { Request, Response, NextFunction } from 'express'

import Order from '../models/orderModel'

import Product from '../models/productModel'

const controller = {
  list: async(req: Request, res: Response, next: NextFunction) => {
    const order = Order
      .find({})
      .select('productId quantity _id')
      .populate('productId', 'name price')
      .then(docs => {
        if(docs.length >= 1) {
          res
            .status(200)
            .json({
              count: docs.length,
              orders: docs.map(doc => {
                return {
                  _id: doc['_id'],
                  productId: doc['productId'],
                  quantity: doc['quantity'],
                  request: {
                    type: 'GET',
                    url: 'http://localhost:4000/orders/' + doc['_id']
                  }
                }
              })
            })
        } else {
          res
            .status(404)
            .json({
              message: 'No entries found'
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

  add: async(req: Request, res: Response, next: NextFunction) => {
    const id: string = req.body.productId

    const product = Product
      .findById(id)
      .then(prod => {
        if(!prod) {
          // return res produce Error
          res
            .status(404)
            .json({
              message: 'Product not found'
            })
        }

        const order = new Order({
          productId: id,
          quantity: req.body.quantity
        })

        order.save()
      })
      .then(result => {
        res
          .status(201)
          .json({
            message: 'Order stored',
            createdOrder: {
              _id: result['_id'],
              productId: result['productId'],
              quantity: result['quantity']
            },
            request: {
              type: 'GET',
              url: 'http://localhost:4000/orders/' + result['_id']
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

  detail: async(req: Request, res: Response, next: NextFunction) => {
    const id: string = req.body.orderId

    const order = Order
      .findById(id)
      .select('productId quantity _id')
      .populate('productId', 'name price')
      .then(order => {
        if(!order) {
          return res
            .status(404)
            .json({
              message: "Order not found"
            })
        }

        res
          .status(200)
          .json({
            message: "Order details",
            order: order,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/orders'
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

  delete: async(req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.orderId

    const order = Order
      .remove({ _id: id })
      .then(result => {
        res
          .status(200)
          .json({
              message: "Order deleted",
              request: {
                  type: 'POST',
                  url: 'http://localhost:4000/orders/',
                  body: { productId: "ID", quantity: "Number" }
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
