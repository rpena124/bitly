const {Schema, model} = require('mongoose')

const linkSchema = new Schema({
    url:{type:String, required: true},
    shortUrl:{type:String, required: true},
})