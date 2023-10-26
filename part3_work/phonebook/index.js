const express = require('express');
const app = express(); 
const cors = require('cors');
const Person = require('./models/person')
require('dotenv').config()
/*
    Defining unknown endpoint and errorHandler middleware
 */

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError'){
        return response.status(404).send({error:'Malformatted id'})
    }else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    next(error)
}
const unknownEndPoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) =>{
    Person.find({}).then(result => {
        console.log('the data is being displayed')
        response.json(result)
    })
})

app.get('/info', (request, response) => {
    const now = new Date()
    
    response.send(`
        <p>Phonebook has info for ${data.length} people</p>
        <br />
        <p>The current time is ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(result => {
        if (result){
            response.json(result)
        }else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/delete/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(deletedPerson => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name){
        response.send(404).json({
            error: 'Name is missing'
        })
    }
    

    const name = new Person({
        name: body.name, 
        number: body.number
    })

    name.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => {next(error)})
})
app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT,() => {
    console.log(`The app is running on ${PORT}`)
})