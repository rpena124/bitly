const Link = require('../../models/link')
const User = require('../../models/user')

const LinkSerialNumber = require('../../models/linkSerialNumber')

const crypto = require('crypto')
// let linkSerialNumber = 0 // This will be changed to model tracked input


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
      req.body.shortUrl = shortLink()
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
    },
    async update (req, res, next) {
      try {
      const user = await User.findById(req.params.id)
      const counter = await LinkSerialNumber.findById(req.params.serialId)
      console.log(counter.linkSerialNumber)
      req.body.shortUrl = shortLink(counter.linkSerialNumber)
      
      Link.create(req.body, (err, createdLink) => {
        if (err) {
          res.status(400).send({
            msg: err.message
          })
        } else {

            user.links.addToSet(createdLink._id)              
            user.save()
            counter.linkSerialNumber++
            counter.save()

          res.locals.data.link = createdLink
          next()
        }
      })
    } catch {
      res.status(400).json('stupid error')
    }
  }

}

const apiController = {

  index (req, res, next) {
    res.json(res.locals.data.links)
  },
  show (req, res, next) {
    res.json(res.locals.data.link)
  }
}

module.exports = {
  apiController,
  dataController
}

const shortLink = (longUrl) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const hashUrl = crypto.createHmac('sha256', 'reclaimer').update(longUrl).digest('hex')
  let input = parseInt((hashUrl.match(/[0-9]/g) || []).join(''))


function shortLink(counter) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  while (input > 0) {
    result += characters[input % 62]
    input = Math.floor(input / 62)
  }


  const counterHash = crypto.createHmac('sha256', 'forerunner').update(counter.toString()).digest('hex')
  const hashResult = crypto.createHmac('sha256', 'reclaimer').update(result).digest('hex')

  const randomSelection = Math.floor(Math.random() * (hashResult.length - 7))

  const linkTemplate = hashResult.substring(randomSelection, randomSelection + 7).split('')
  linkTemplate.unshift(counterHash.substring(0, 3))

  return linkTemplate.join('').substring(0, 7);

}
