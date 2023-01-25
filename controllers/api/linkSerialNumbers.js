const LinkSerialNumber = require('../../models/linkSerialNumber')

const dataController = {
  // Index
  index (req, res, next) {
    LinkSerialNumber.find({}, (err, foundLinkSerialNumbers) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.linkSerialNumbers = foundLinkSerialNumbers
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    LinkSerialNumber.create(req.body, (err, createdLinkSerialNumber) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.linkSerialNumber = createdLinkSerialNumber
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    LinkSerialNumber.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedLinkSerialNumber) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.linkSerialNumber = updatedLinkSerialNumber
        next()
      }
    })
  }
}

const apiController = {

  index (req, res, next) {
    res.json(res.locals.data.linkSerialNumbers)
  },
  show (req, res, next) {
    res.json(res.locals.data.linkSerialNumber)
  }
}

module.exports = {
  apiController,
  dataController
}
