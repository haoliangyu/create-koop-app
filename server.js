const express = require('express')
const apiNewHanlder = require('./api/new/handler')

const app = express()
app.use(express.json())

const port = 3000

app.post('/api/new', apiNewHanlder)

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
})
