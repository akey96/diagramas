const express = require('express')

const app = express()

// app.use(require('./clase.route'))
// app.use(require('./diagrama.route'))
app.use(require('./rectangulo.route'))

module.exports = app
