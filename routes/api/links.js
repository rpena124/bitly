
const express = require('express')
const router = express.Router()


//GET: Index api/links ( )
router.get('/links' , linkDataController.index , apiController.index)
//DELETE 
router.delete('/link/:id', linkDataController.destroy, apiController.show)
//Create /api/links
router.post('/link',linkDataController.create, apiController.show)
// Show: Get /api/links/:id
router.get('/:Id', linkDataController.show, apiController.show)

module.exports = router