import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send(
        '<h1>Example App</h1>' +
        '<p>Try these routes:</p>' +
        '<ul>' +
        '<li><a href="/env">/env</a></li>' +
        '<li><a href="/env/USER">/env/USER</a></li>' +
        '</ul>'
    )
})

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

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000')
})