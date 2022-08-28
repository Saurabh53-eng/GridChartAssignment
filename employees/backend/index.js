const connectToMongo = require('./db');
const express = require('express')
const cors=require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/v1', require('./routes/employees'))

app.listen(port, () => {
  console.log(`employees backend listening at http://localhost:${port}`)
})