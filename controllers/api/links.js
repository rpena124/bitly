const Link = require('../../models/link')
const crypto = require('crypto')

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
      req.body.shortUrl = shortLink(req.body.link)
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

function shortLink() {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ''

  for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  const hashResult = crypto.createHmac('sha256', 'secret').update(result).digest('hex').split('').reverse().join('')
  const randomSelection = Math.floor(Math.random() * (hashResult.length - 7))
  let linkTemplate = hashResult.substring(randomSelection, randomSelection + 7)
  return linkTemplate;
}



console.log(shortLink())