// Procedimiento para subir archivos individuales de imágenes.

import { Request, Response, NextFunction } from 'express'
const multer = require('multer')

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
    /* if(!file.originalname.match(/\.(jpg | jpeg | png | gif)$/)){
        cb(null, false)
    } else {
        cb(null. true)
    }*/
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

export { upload }
