const express = require('express')
const handler = require('./handler')

const app = express()

app.use(express.json())

app.post('*', handler)

app.all('*', (req, res) => {
  res.status(405).send({ error: 'only POST requests are accepted' })
})

module.exports = app
