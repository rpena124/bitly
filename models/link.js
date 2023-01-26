const { Schema, model } = require('mongoose')

const linkSchema = new Schema({
  url: { type: String, required: true },
  shortUrl: { type: String, required: true, default: '' },
  clicks: { type: Number, required: true, default: 0 }
})

const Link = model('Link', linkSchema)

module.exports = Link
