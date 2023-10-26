const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const usersInDb = await User.find({}).populate('blogs')
    response.json(usersInDb)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body 

    const passwordHash = await bcrypt.hash(password, 10)

    if (username.length < 3 || password.length < 3){
        response.status(400).json({
            error: 'Username or Password too small'
        })
        console.log('the length is less than 3 characters')
    } else {const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)}
})

module.exports = usersRouter