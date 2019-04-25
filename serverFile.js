const express = require('express');
const app = express()
const path = require('path')
// + direct to static files
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/dist/nytscrape'))


// mongoose connect stuff see if i should use
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

// mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, function(error) {
 if (error) {
  console.log(error)
  throw error
 }
})



// mongoose.connect(MONGODB_URI, {useNelParser: true});

const db = require('./server/models')

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

app.get('/api/articles-test', (req, res) => {
 console.log('test route being hit')
 db.Article.create({ link: 'test', desc: 'test', title: 'test' }).then(results => {
  console.log(results)
  res.json(results)
 }).catch(err => {
  res.json(err)
 })
})

app.get('/api/articles', (req, res) => {
 axios.get("https://www.nytimes.com/").then(response => {
   const $ = cheerio.load(response.data)
   console.log('within the first axios.get')
   const articlePromises = [];
   $('article').each((i, element) => {
    const link = 'https://www.nytimes.com' + $(element).find('a').attr('href')
    const title = $(element).find('h2').text()
    const desc = $(element).find('p').text()
    if (link != '' && title != '' && desc != '') {
     console.log(link, title, desc)
    articlePromises.push(new Promise((resolve, reject) => {
     db.Article.create({ link, title, desc }).then(finished => {
      console.log(finished)
      resolve('fucking done dude')
     }).catch(err => {
      console.log(err, 'this shit fucked up my man')
      reject('fucking sucks dude')
     })
    }))
       // need to put the below within the same.then as above
     // this is happening before save
     // pretty sure the issue is i'm not putting res in here ask about where to put it there
    }
})
 console.log(articlePromises, 'the article promises right before the promise.all')
  Promise.all(articlePromises).then(results => {
    console.log('within promise.all')
    db.Article.find({})
    .then(data => {
      console.log(data)
      res.json(data)
    }).catch(err => {
     console.log(err, 'err inside promise.all')
     res.status(500).json(err)
    })
  }).catch(err => {
   console.log('err directly inside promise.all', err)
   res.status(500).json(err)
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

app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname + '/dist/nytscrape/index.html'))
})



 app.listen(PORT, () => console.log('listening on PORT:', process.env.PORT || 8080))

 


