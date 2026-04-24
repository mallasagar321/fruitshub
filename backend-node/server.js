require('dotenv').config()
const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
const compression = require('compression')

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(compression())

// Routes
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders',   require('./routes/orders'))

// DB connect then start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () =>
      console.log(`Node API running on :${process.env.PORT}`)
    )
  })
  .catch(err => console.error(err))