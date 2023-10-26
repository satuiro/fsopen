const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('----')
  next()
}

// Define the error handler middleware 
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
  
    if (error.name === 'CastError'){
      return response.status(404).send({error: 'Malformatted id'})
    }else if (error.name === 'ValidationError'){
      return response.status(400).json({error : error.message})
    }else if (error.name === 'JsonWebTokenError'){
      return response.status(400).json({error : error.message})
    }
  
    next(error)
  }
// Define the unknown endpoint middleware 
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}  

const tokenExtractor = (request, response, next) =>{
  const authorization = request.get('authorization')
  console.log('Authorization header: ', authorization)
    if (authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
        console.log('Token: ', request.token)
    }
  next()
}

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return next(err)
      }
      request.user = {}
      request.user.id = user.id
      console.log('The user id is: ', request.user.id)
      next()
    })
  }else{
      next()
    }

  
}

module.exports = {
    requestLogger, 
    unknownEndpoint, 
    errorHandler, 
    tokenExtractor, 
    userExtractor
}