import express from 'express';
import http from 'http';

const app = express();

/* HTTP server */

const portHTTP = 3000;

// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express.json());

// Creates anl listens server for HTTP requests (on the task conditions).
let serverHttp = http.createServer(app).listen(portHTTP, () => {
    console.log(`Our HTTP server started and is listening the port ${portHTTP}`);
});

// Handler for requests from Client with method 'Post'.
app.post('/', function (req, res) {
    console.log(`Client's IP: ${req.connection.remoteAddress}`);
    console.log("Time of event is " + new Date().toString());

    console.log("Text from client is id: " + req.body.id + " info: " + req.body.info)

    // Response from server must match to request bode (on the task conditions).
    res.json({ id: req.body.id, info: req.body.info }); 
    
    //res.end();

});

/**
 * Function-handler for shut down event.
 */
function stopServer() {
    serverHttp.close(() => {
        console.log('Server will stopped!');
        process.exit(0);
    })
}

// Enable shut down function after press Ctrl + C
process.on('SIGINT', stopServer);


// npm run build && npm run myRunServers