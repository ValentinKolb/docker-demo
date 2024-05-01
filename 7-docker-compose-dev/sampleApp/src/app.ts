import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'

dotenv.config()

const app = express()

// route to serve public files
app.use(express.static('public'))

// route to return all environment variables
app.get('/env', (req, res) => {
    res.send(process.env)
})

// route to return the value of a specific environment variable
app.get('/env/:var', (req, res) => {
    // Get the value of the specified environment variable
    const envVar = process.env[req.params.var];
    // Send the value as the response
    res.send(envVar);
})

// add CTRL+C handler
process.on('SIGINT', () => {
    console.info('SIGINT signal received.')
    console.log('Closing http server. Bye!')
    process.exit(0)
})

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port http://0.0.0.0:3000')
})