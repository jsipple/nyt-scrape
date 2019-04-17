const mongoose = require('mongoose')

const Schema = mongoose.Schema

let articleSchema = new Schema({
 title: {
  type: String,
  unique: true
 },
 link: { 
  type: String,
  unique: true
 },
 desc: {
  type: String,
  unique: true
 } 

})

let Article = mongoose.model('articles', articleSchema)

module.exports = Article