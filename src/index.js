// Requiring the http module
const http = require('http');
// Creating a port variable to listen on later
const port = 3000;
// Creating a server object
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
    }

    res.end();
});
// Server setup, listening on port 3000 (port variable)
server.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});