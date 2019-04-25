const express = require('express');
const app = express()
const path = require('path')
// + direct to static files
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// mongoose connect stuff see if i should use
var MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static(__dirname + '/dist/nytscrape'))


// mongoose.connect(MONGODB_URI, {useNelParser: true});
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).catch(err => console.log(err));
mongoose.Promise = global.Promise
const db = require('./server/models/index')

// move thes
// think i need to do this to call will be pushing in a bit
// end
// this is being run just find need to send the data back though

app.post('/api/fav', (req, res) => {
  console.log(req.body)
 // comes back as an empty object
 let favArt = new db.FavArticle(req.body)
 favArt.save()
 // need to find the appropriate article first and store the link title desc as their respective variables
 // let favorite = new FavArticle({link,title,desc})
 // favorite.save
})

app.get('/api/favorite', (req, res) => {
  db.FavArticle.find({})
  .then(data => {
    res.json(data)
  })
})
app.post('/api/fav/:id', (req, res) => {
  let title = req.body.title
  let note = req.body.note
  console.log(req.body)
  db.FavArticle.findOneAndUpdate({title: title}, {$push: {notes: note}})
})

app.post('/api/addNote/:id', (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  note = req.body.note
  id = req.params.id
  db.FavArticle.findOneAndUpdate({title: id}, {$push: {notes: note}}).catch(err => console.log(err))
})

app.get('/api/articles', (req, res) => {
 axios.get("https://www.nytimes.com/").then(response => {
   const $ = cheerio.load(response.data)
   const results = []

   const articlePromises = [];
   $('article').each((i, element) => {
    const link = 'https://www.nytimes.com' + $(element).find('a').attr('href')
    const title = $(element).find('h2').text()
    const desc = $(element).find('p').text()
    if (link != '' && title != '' && desc != '') {
    let article = new db.Article({link, title, desc})
    articlePromises.push(article.save())

       // need to put the below within the same.then as above
     // this is happening before save
     // pretty sure the issue is i'm not putting res in here ask about where to put it there
    }
})

  Promise.all(articlePromises).then(results => {
    db.Article.find({})
    .then(data => {
      console.log(data)
      res.json(data)
    }).catch(err => console.log(err))
  })
   
  //  issue articles not being saved before this runs i guess
    
   // need to grab from database instead of just grabbing scrape
   // doing it this way returns only the ones just scraped
   // not sure if this will work seems basically want needs to (doesn't work)
   // let doc = await articles.find({})
   // console.log(doc)
   // not sure what needs to be done above right now just sending what is grabbed not what is saved to the database
  //  res.json(results)
})
})

app.delete('/api/delete', (req,res) => {
  db.Article.remove({}).catch(err => console.log(err))
})

app.delete('/api/deleteOne/:id', (req,res) => {
  // not actually grabbing anything just deleting the first one
  let title = {title: req.params.id}  
  console.log(title)
  db.FavArticle.deleteOne(title).catch(err => console.log(err))
})

app.put('/api/delNote/:id/:note', (req,res) => {
  let title = {title: req.params.id}
  console.log(title)
  // this works only issue is need to pull again to see cha
  let note = req.params.note
  console.log(note)
  db.FavArticle.update(title, {$pull: {notes: note}}).catch(err => console.log(err))
})

app.listen(process.env.PORT || 8080) 

app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname + '/dist/nytscrape/index.html'))
})
