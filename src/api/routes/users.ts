import express= require('express')
const router = express.Router()

import { controller as ctrl } from '../controllers/userController'

// Signup
router.post('/signup', ctrl.signup)

// Login
router.post('/login', ctrl.login)

// Delete
router.delete('/:userId', ctrl.delete)

export { router }
