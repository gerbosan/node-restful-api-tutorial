import express = require('express')
const router = express.Router()

// const multer = require('multer')

import { controller as ctrl } from '../controllers/productController'
import { upload } from '../middleware/uploadSingle'
import { checkAuth } from '../middleware/check-auth'
/*
// Estableciendo multer
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, './uploads')
    },
    filename: (req: Request, file: any, cb: Function) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req: Request, file: any, cb: Function) => {
    // Reject a file by mimetype
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})
*/
// List
router.get('/', ctrl.list)

// Add
router.post('/', checkAuth, upload.single('productImage'), ctrl.add)

// Detail
router.get('/:productId', ctrl.detail)

// Edit
router.patch('/:productId', checkAuth, upload.single('productImage'), ctrl.edit)

// Delete
router.delete('/:productId', checkAuth, ctrl.delete)

export { router }
