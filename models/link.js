const {Schema, model} = require('mongoose')

const linkSchema = new Schema({
    url:{type:String, required: true},
    shortUrl:{type:String},
})

const Link = model('Link', linkSchema)

module.exports = Link