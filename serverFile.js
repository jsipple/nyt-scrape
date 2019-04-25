const express = reqire('express');
const app = express()
// + direct to static files
app.use(express.state(__dirname + '/src'))

app.listen(process.env.PORT || 8080)