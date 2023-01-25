const {Schema, model} = require('mongoose')

const linkSerialNumberSchema = new Schema({
    linkSerialNumber: {type: Number}
})

const LinkSerialNumberSchema = model('LinkSerialNumber', linkSerialNumberSchema)

module.exports = LinkSerialNumberSchema