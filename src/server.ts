// Declaraciones e importaciones
import express = require('express')
import { Application, Request, Response, NextFunction } from 'express'
import mongoose = require('mongoose')
import bodyParser = require('body-parser')
import morgan = require('morgan')
import cors = require('cors')
import dotenv = require('dotenv')

import { conexionMongo } from './config/connexions'

import { router as productRoutes } from './api/routes/products'
import { router as orderRoutes } from './api/routes/orders'
import { router as userRoutes } from './api/routes/users'

// Configuraciones
const environ: dotenv.DotenvResult = dotenv.config({ path: './variables.env' })
if(environ.error) {
  throw environ.error
}
const app: Application = express()
app.set('port', process.env.PORT)

mongoose.connect(conexionMongo, error => {
  if(error) {
    console.log(error)
  } else {
    console.log("Connected to Mongo")
  }
})
mongoose.Promise = global.Promise

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}))
// Creación de carpeta para guardar imágenes
app.use('/uploads', express.static('uploads'))

// Rutas
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

// Servidor
app.listen(app.get('port'), () => {
console.log(`Execution in port ${app.get('port')}`)
})
