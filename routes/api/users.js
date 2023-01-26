// /routes/api/users.js
const express = require('express')
const router = express.Router()
const {
  checkToken,
  dataController,
  apiController,
  linkDataController
} = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', dataController.create, apiController.auth)

// POST /api/users/login
router.post('/login', dataController.login, apiController.auth)

// GET: /api/links - Index Route
router.get('/', dataController.index, apiController.index)

// GET /api/links - Show Route
router.get('/:id', dataController.show, apiController.show)

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router
