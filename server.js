const express = require('express');
const routes = require ('./routes');

const server = express();
const port = 5000;






server.use(express.json())
server.use('/', routes);
server.listen(port, () => console.log(`Server started on port ${port}`))