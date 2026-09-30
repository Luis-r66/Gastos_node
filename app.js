const express = require('express')
const gasto_routes = require('./routes/gasto')

const app = express()


app.set('port', process.env.PORT || 3000)


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/gastos', gasto_routes)

module.exports = app