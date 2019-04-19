const express = require('express')
const apiNewHanlder = require('./api/new/handler')

const app = express()
app.use(express.json())

app.post('/api/new', apiNewHanlder)

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}.`)
})
