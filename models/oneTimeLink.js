const { Schema, model } = require('mongoose')

const oneTimeLinkSchema = new Schema({
  url: String,
  shortUrl: String
}, {
  timestamps: true
})

const OneTimeLink = model('OneTimeLink', oneTimeLinkSchema)

module.exports = OneTimeLink
