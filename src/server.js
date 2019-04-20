const express = require('express')
const getApiHanlder = require('./api/new/get-handler')
const postApiHanlder = require('./api/new/post-handler')

const app = express()
app.use(express.json())

app.get('/api/new/:type/:name', getApiHanlder)
app.post('/api/new', postApiHanlder)

app.all('*', (req, res) => {
  res.status(405).send({ message: 'API not supported' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}.`)
})
