const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null 
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
    // console.log(blogs[1].user._id.toString())
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        return response.status(401).json({ error: 'user not found' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.json(savedBlog);
});


blogsRouter.delete('/:id', async (request, response) => {
    const blogDeleted = await Blog.findById(request.params.id)
    console.log(request.params.id.toString())
    console.log(blogDeleted)
    if (request.params.id.toString() === blogDeleted._id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
        console.log('delete successful')
    } else {
        return response.status(401).json({ error: "The delete request was not processed" })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const content = {
        title: body.title, 
        author: body.author, 
        url: body.url, 
        likes: body.likes
    }

    const updBlog = await Blog.findByIdAndUpdate(request.params.id, content, {new: true})
    response.json(updBlog)
})

module.exports = blogsRouter