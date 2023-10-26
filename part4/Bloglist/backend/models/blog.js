const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String, 
    author: String, 
    url: String, 
    likes: Number, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
})

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id 
        delete ret._id
    }
})

module.exports = mongoose.model('Blog', blogSchema)