let mongoose = require('mongoose')
let Schema = mongoose.Schema

let GastoSchema = Schema ({
  descripcion: String,
  monto: Number,
  categoria: String,
  fecha: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Gasto', GastoSchema, 'gastos')