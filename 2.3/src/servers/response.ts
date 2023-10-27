import express from 'express';
import http from 'http';
import net from 'net';
import dgram from 'dgram';

const app = express();

/* HTTP server */

const portHTTP = 3000;

// A built-in intermediary (middleware) that parses incoming requests into a JSON object.
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
    })
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

        console.log("Text from client is " + wholeRequest)
    })
})

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
    })
}

process.on('SIGINT', stopTCPServer)

/* UDP server */

const portUDP = 3002;

const serverUDP = dgram.createSocket('udp4');

// emits when any error occurs
serverUDP.on('error', function (error) {
    console.log('Error: ' + error);
    serverUDP.close();
});

// emits when socket is ready and listening for datagram msgs
serverUDP.on('listening', () => {
    const address = serverUDP.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

serverUDP.bind(portUDP);

// emits on new datagram msg
serverUDP.on('message', function (msg, info) {
    console.log("**** UDP SERVER ****");

    console.log(`Client's IP: ${info.address}:${info.port}`);

    console.log("Time of event is " + new Date().toString());

    console.log('Data received from client : ' + msg.toString());
    
    //sending msg
    serverUDP.send(msg, info.port, 'localhost', function (error) {
        if (error) {
            serverUDP.close();
        } else {
            console.log('Data sent !!!');
        }

    });

});

// Function to gracefully shutdown the server
function shutdownServer() {
    serverUDP.close(() => {
      console.log('Server is shutting down.');
      process.exit(0);
    });
  }
  
  // Listen for SIGINT signal (Ctrl+C) to initiate server shutdown
  process.on('SIGINT', shutdownServer);


// npm run build && npm run myRunServers
