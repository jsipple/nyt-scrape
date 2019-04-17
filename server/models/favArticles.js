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

let FavArticle = mongoose.model('favArticles', articleSchema)

module.exports = FavArticle