import dotenv = require('dotenv')
const environ = dotenv.config({ path: './variables.env'})
if(environ.error) {
    throw environ.error
}

const user: string = process.env.MONGO_USER
const pass: string = process.env.MONGO_PASS
const uri: string = process.env.MONGO_URI

const conexionMongo: string = `mongodb://${user}:${pass}@${uri}`
// console.log(conexionMongo)

export { conexionMongo }
