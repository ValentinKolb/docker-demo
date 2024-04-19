import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import * as fs from 'fs'

const app = express()

app.get('/', (req, res) => {
    res.send(
        '<h1>Example App</h1>' +
        '<p>Try these routes:</p>' +
        '<ul>' +
        '<li><a href="/env">/env</a></li>' +
        '<li><a href="/env/USER">/env/USER</a></li>' +
        '<li><a href="/json">/json</a></li>' +
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
});

// route to return the value of the "message" field in data.json
app.get('/json', (req, res) => {
    // Read the JSON file synchronously
    const data = fs.readFileSync('/var/opt/data.json', 'utf8')
    // Parse the JSON data
    const jsonData = JSON.parse(data)
    // Get the value of the "message" field
    const message = jsonData.message
    // Send the message as the response
    res.send(message)
})

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000')
})
