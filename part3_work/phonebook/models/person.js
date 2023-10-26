const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = String(process.env.MONGODB_URI)

console.log('connecting to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('The error in connecting to mongodb: ',error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3, 
        required: true, 
    }, 
    number: Number, 
})

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = new mongoose.model('Person', personSchema)