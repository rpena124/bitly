const Link = require('../../models/link')


const dataController = {

    //Index
    index (req, res, next) {
      Link.find({}, (err, foundLinks)=>{
        if(err){
          console.error(err)
          res.status(400).send(err)
        }
        else{
          res.locals.data.links = foundLinks
          next()
        }
      })
    },
    //Destroy 
    destroy(req, res, next) {
      Link.findByIdAndDelete(req.params.id, (err, deletedLink) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          res.locals.data.link = deletedLink
          next()
        }
      })
    },
    //Create
    create(req, res, next) {
      Link.create(req.body, (err, createdLink) => {
        if (err) {
          res.status(400).send({
            msg: err.message,
          })
        } else {
          res.locals.data.link = createdLink
          next()
        }
      })
    },
    //Show
    show(req, res, next) {
      Link.findById(req.params.id, (err, foundLink)=>{
        if(err){
          console.error(err)
          res.status(400).send(err)
        }
        else{
          res.locals.data.link = foundLink
          next()
        }
      })
    }
  
  }

  const apiController = {

    index(req, res, next) {
      res.json(res.locals.data.links)
    },
    show(req, res, next) {
      res.json(res.locals.data.link)
    }
  }

  module.exports = {
    apiController,
    dataController
  }