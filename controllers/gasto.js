let Gasto = require('../models/gasto')

const controller = {
  getGastos: function (req, res) {
    Gasto.find({}).exec()
      .then(gastosList => {
        if (!gastosList) return res.status(404).send({message: "No data found"})
        return res.status(200).json(gastosList)
      })
      .catch(err => res.status(500).send({message: `Error: ${err}`}))
  },
  getGasto: function (req, res) {
    let gastoId = req.params.id
    if (gastoId == null) return res.status(404).send({message: "gasto not found"})

    Gasto.findById(gastoId).exec()
      .then(data => {
        if (!data) return res.status(404).send({message: "Gasto not found"})
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({message: `Internal error-> ${err}`}))
  },
  saveGasto: function (req, res) {
    let gasto = new Gasto()
    const {descripcion, monto, categoria} = req.body
    if (descripcion && monto) {
      gasto.descripcion = descripcion
      gasto.monto = monto
      gasto.categoria = categoria || "general"

      gasto.save()
        .then(storedGasto => {
          storedGasto
            ? res.status(200).json({gasto: storedGasto})
            : res.status(404).send({message: "Error saving the document"})
        })
        .catch(error => res.status(500).send({message: "Error while saving the document"}))
    } else {
      return res.status(400).send({message: "Data is not right"})
    }
  },
  updateGasto: function (req, res) {
    let gastoId = req.params.id
    let update = req.body

    Gasto.findByIdAndUpdate(gastoId, update, {returnDocument: 'after'})
      .then(updatedGasto => {
        if(!updatedGasto) return res.status(404).send({message: "The document does not exist"})
        return res.status(200).send({gasto: updatedGasto})
      })
      .catch(error => res.status(500).send({message: `Error while updating ${error}`}))
  },
  deleteGasto: function (req, res) {
    let gastoId = req.params.id

    Gasto.findByIdAndRemove(gastoId)
      .then(removedGasto => {
        if (!removedGasto) return res.status(404).send({message: "The gasto does not exist"})
        return res.status(200).send({gasto: removedGasto})
      })
      .catch(err => res.status(500).send({message: "Error while deleting"}))
  }
}

module.exports = controller