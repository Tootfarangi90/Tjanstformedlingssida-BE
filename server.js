const express = require('express');
const app = express();
const routes = require ('./routes');
var favicon = require('serve-favicon')
var path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')



const port = process.env.PORT || 5000;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API routes",
            version :"1.0.0",
            description: "Yes really, API routes"
        },
        contact: {
            name: "Robert L"
        },
        servers: [{url: "http://localhost:5000"}]
    },
    apis: ["routes.js"]
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));





app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())
app.use('/', routes);
app.listen(port, () => console.log(`Server started on port ${port}`))