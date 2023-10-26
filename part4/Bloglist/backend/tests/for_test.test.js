const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const initialBlogs = [
    {
        title: "Black Swan Farming",
        author: "Paul Graham",
        url: "http://paulgraham.com/swan.html",
        likes: 8174,
        
    }
]

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})

test('the content type is in json', async () => {
    await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
})

test('a new blog is added', async () => {
    const newBlog = {
        "title": "The Mythical Man-Month",
        "author": "Frederick P. Brooks",
        "url": "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        "likes": 4231
      }

    await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
})

test('to verify the unique ident-prop is id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body[0].id).toBeDefined()
})


afterAll(async () => {
    await mongoose.connection.close()
})