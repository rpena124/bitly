
const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/links')

//GET: Index api/links ( )
router.get('/', dataController.index, apiController.index)
//DELETE 
router.delete('/:id', dataController.destroy, apiController.show)
//Create /api/links
router.post('/',dataController.create, apiController.show)
// // Show: Get /api/links/:id
router.get('/:id', dataController.show, apiController.show)

router.post('/:id', dataController.update, apiController.show)


module.exports = router