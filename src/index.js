// Requiring the module and initializing express
const express = require('express');
const url = require("url");
const app = express();

// Requiring the http module
const http = require('http');

// Creating a port variable to listen on later
const port = 3000;

// Creating a server object
/*
const server = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    if (req.method !== 'GET'){
        res.statusCode = 405;
        res.write("error; not allowed");
    }else {
        if (req.url === "/hello"){
            res.statusCode = 200;
            res.write('Hello World!');
        }else {
            res.statusCode = 404;
            res.write("error; not found");
        }
        console.log("test")
    }

    res.end();
});
 */




/**
 * GET requests
 */
app.get('/whiskies', function (req, res){
    res.status(200).send(whiskies);
})

app().get('/whiskies/:whiskyId', function (req, res){
    const number = req.params.id;

    res.status(200).send(`Whisky with id ${id} here!`);
});

/**
 * POST requests
 */
app().post('/', function (req, res){
    res.post();
});

/**
 * PUT requests
 */
app().put('/', function (req, res){
    res.put();
});

/**
 * DELETE requests
 */
app().delete('/', function (req, res){
    res.delete();
});


// Server setup, listening on port 3000 (port variable)
server.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});

/* HELPER FUNCTIONS */

function returnWhiskyById(id){
    for (const whisky of whiskies){
        if (whisky.id == id){
            return whisky;
        }
    }
}

function filterWhiskyByDistilleryName(distilleryName){
    let whiskiesReturn = [];
    for (const whisky of whiskies){
        if (whisky.distillery.includes(distilleryName)){
            whiskiesReturn.push(whisky);
        }
    }
    return whiskiesReturn;
}