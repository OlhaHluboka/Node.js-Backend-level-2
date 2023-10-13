import express from 'express';
import http from 'http';
import net from 'net';
const app = express();
/* HTTP server */
const portHTTP = 3000;
// A built-in intermediary that parses incoming requests into a JSON object.
app.use(express.json());
// Creates and listens server for HTTP requests (on the task conditions).
let serverHttp = http.createServer(app).listen(portHTTP, () => {
    console.log(`Our HTTP server started and is listening the port ${portHTTP}`);
});
// Handler for requests from Client with method 'Post'.
app.post('/', function (req, res) {
    console.log("**** HTTP SERVER ****");
    console.log(`Client's IP: ${req.connection.remoteAddress}`);
    console.log("Time of event is " + new Date().toString());
    console.log("Text from client is id: " + req.body.id + " info: " + req.body.info);
    // Response from server must match to request body (on the task conditions).
    // Method json() send to client this message
    res.json({ id: req.body.id, info: req.body.info });
    //res.end(); // Method res.end() does not needed there because we already send an answer to client by method json() above
});
/**
 * Function-handler for shut down event.
 */
function stopServer() {
    serverHttp.close(() => {
        console.log('Server HTTP will stopped!');
        process.exit(0);
    });
}
// Enable shut down function after press Ctrl + C
process.on('SIGINT', stopServer);
/* TCP server */
const portTCP = 3001;
const hostnameTCP = 'localhost';
// Creates and listens server for HTTP requests (on the task conditions).
let serverTCP = net.createServer((soket) => {
    let wholeRequest = '';
    // Listen for data chunks received from the client (session is running)
    soket.on('data', (data) => {
        console.log("**** TCP SERVER ****");
        console.log(`Client's IP: ${soket.remoteAddress}`);
        wholeRequest += data; // receiving packets
        console.log("Time of event is " + new Date().toString());
        soket.write(wholeRequest); // sends data on soket
        console.log("Text from client is " + wholeRequest);
    });
});
serverTCP.listen(portTCP, () => {
    console.log(`TCP server running at http://${hostnameTCP}:${portTCP}`);
});
/**
 * Function-handler for shut down event.
 */
function stopTCPServer() {
    serverTCP.close(() => {
        console.log('Server TCP will stopped!');
        process.exit(0);
    });
}
process.on('SIGINT', stopTCPServer);
// npm run build && npm run myRunServers
