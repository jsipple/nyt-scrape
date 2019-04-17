const mongoose = require('mongoose')

const Schema = mongoose.Schema

let noteSchema = new Schema({
 title: String,
 body: String
})

let Note = mongoose.model('notes', noteSchema)


module.exports = Note