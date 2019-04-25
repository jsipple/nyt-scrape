const express = require('express');
const app = express()
// + direct to static files
app.use(express.static(__dirname + '/dist'))

app.listen(process.env.PORT || 8080)