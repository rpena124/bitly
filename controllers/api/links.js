const Link = requie('../../models/links')


const linkDataController = {
    //Index
    async index(req, res, next) {
      const links = await User.find({ user: req.user._id }).populate('link')
      res.status(200).json(links)
    },
    //Destroy 
    destroy(req, res, next) {
      User.findByIdAndDelete(req.params.id, (err, deletedLink) => {
        if (err) {
          res.status(400).send({
            msg: err.message,
          })
        } else {
          res.locals.data.link = deletedLink
          next()
        }
      })
    },
    //Create
    create(req, res, next) {
  
      req.body.user = req.user._id
      User.create(req.body, (err, createdLink) => {
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
    async show(req, res, next) {
  
      const link = await User.findById(req.params.id).populate('list')
      res.status(200).json(link)
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
    linkDataController
  }