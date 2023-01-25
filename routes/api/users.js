// /routes/api/users.js
const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController, linkDataController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', dataController.create, apiController.auth)
// POST /api/users/login
router.post('/login', dataController.login, apiController.auth)

//GET: Index api/links ( )
router.get('/history' , linkDataController.index , apiController.index)
// //DELETE 
// router.delete('/link/:id', linkDataController.destroy, apiController.show)
// //Create /api/links
// router.post('/link',linkDataController.create, apiController.show)
//Show: Get /api/links/:id
// router.get('/:Id', linkDataController.show, apiController.show)

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router

