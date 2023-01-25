const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/linkSerialNumbers')

// Index
router.get('/', dataController.index, apiController.index)
// Create
router.post('/',dataController.create, apiController.show)
// Update
router.put('/:id', dataController.update, apiController.show)


module.exports = router