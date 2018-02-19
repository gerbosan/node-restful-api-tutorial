import express = require('express')
const router = express.Router()

import { controller as ctrl } from '../controllers/orderController'

import { checkAuth } from '../middleware/check-auth'

// List
router.get('/', checkAuth, ctrl.list)

// Add
router.post('/', checkAuth, ctrl.add)

// Detail
router.get('/:orderId', checkAuth, ctrl.detail)

// Delete
router.delete('/orderId', checkAuth, ctrl.delete)

export { router }
