const express = require('express');
const routes = require ('./routes');
var favicon = require('serve-favicon')
var path = require('path')

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))





app.use(express.json())
app.use('/', routes);
app.listen(port, () => console.log(`Server started on port ${port}`))