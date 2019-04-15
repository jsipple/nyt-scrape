const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
// mongoose connect stuff see if i should use
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}).catch(err => console.log(err));
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

let articleSchema = new Schema({
 title: String,
 link: String,
 desc: String
})

let Article = mongoose.model('articles', articleSchema)
// think i need to do this to call will be pushing in a bit
let FavArticle = mongoose.model('favArticles', articleSchema)
// end
// this is being run just find need to send the data back though

app.post('/api/fav', (req, res) => {
 // comes back as undefined doing something wrong
 console.log(req.body)
 const fav = Article.findOne({title: req.body})
 // need to find the appropriate article first and store the link title desc as their respective variables
 // let favorite = new FavArticle({link,title,desc})
 // favorite.save
})

app.get('/api/articles', (req, res) => {
 axios.get("https://www.nytimes.com/").then(response => {
   const $ = cheerio.load(response.data)
   const results = []
   $('article').each((i, element) => {
       const link = 'https://www.nytimes.com' + $(element).find('a').attr('href')
       const title = $(element).find('h2').text()
       const desc = $(element).find('p').text()
       console.log(title)

       if (link != '' && title != '' && desc != '') {
       let article = new Article({link, title, desc})
        article.save((err, articles) => {
         if (err) throw err
         console.log(articles)
        })
        results.push({link, title, desc})
       }
   })
   // need to grab from database instead of just grabbing scrape
   // doing it this way returns only the ones just scraped
   // not sure if this will work seems basically want needs to (doesn't work)
   // let doc = await articles.find({})
   // console.log(doc)
   // not sure what needs to be done above right now just sending what is grabbed not what is saved to the database
   res.json(results)
})
})
// need to have this link on click then do
app.listen(8080, () => {
 console.log('listening on port 8080')
})
// let art = new Article(results) this will grab results from below(will need to have it in a for loop)
