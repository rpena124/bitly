const OneTimeLink = require('../../models/oneTimeLink')

const dataController = {
  index (req, res, next) {
    OneTimeLink.find({}, (err, foundOneTimeLinks) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.oneTimeLinks = foundOneTimeLinks
        next()
      }
    })
  },
  destroy (req, res, next) {
    OneTimeLink.findByIdAndDelete(req.params.id, (err, deletedOneTimeLink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.oneTimeLink = deletedOneTimeLink
        next()
      }
    })
  },
  update (req, res, next) {
    OneTimeLink.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedOneTimeLink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.oneTimeLink = updatedOneTimeLink
        next()
      }
    })
  },
  create (req, res, next) {
    OneTimeLink.create(req.body, (err, createdOneTimeLink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.oneTimeLink = createdOneTimeLink
        next()
      }
    })
  },
  show (req, res, next) {
    OneTimeLink.findById(req.params.id, (err, foundOneTimeLink) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.oneTimeLink = foundOneTimeLink
        next()
      }
    })
  }
}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.oneTimeLinks)
  },
  show (req, res, next) {
    res.json(res.locals.data.oneTimeLink)
  }
}

module.exports = { dataController, apiController }
