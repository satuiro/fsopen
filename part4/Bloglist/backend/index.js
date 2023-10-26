const app = require('./app') 
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
    console.log(`The app is running on ${config.PORT}`)
})