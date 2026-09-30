const { Router } = require('express')
const GastoController = require('../controllers/gasto')

const router = Router()

router.get('/', GastoController.getGastos)
router.get('/:id?', GastoController.getGasto)
router.post('/save-gasto', GastoController.saveGasto)
router.put('/edit-gasto/:id?', GastoController.updateGasto)
router.delete('/delete-gasto/:id?', GastoController.deleteGasto)

module.exports = router