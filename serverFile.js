const express = require('express');
const app = express()
const path = require('path')
// + direct to static files
app.use(express.static(__dirname + '/dist/nytscrape'))

app.listen(process.env.PORT || 8080)

app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname + '/dist/nytscrape/index.html'))
})