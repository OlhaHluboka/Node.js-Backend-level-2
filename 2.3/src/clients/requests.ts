/* HTTP client. */

async function sendRequest() {

  let url1 = "http://localhost:3000/";
  
  // Text from Client to Server
  let textPost = {
    id: "First fetch",
    info: "Hello, server!"
  };

  // Fixes start time of process passing data to server.
  const startTime = performance.now();

  // Passes a request by method 'fetch' from in-builded Fech API in Node.js
  const response = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(textPost)
  });

  // Obtains an answer from server we connect in JSON format.
  let result = await response.json();
  
  // Fixes end time after receiving response from server.
  const endTime = performance.now();
  
  console.log("---HTTP protocol---")

  // Conditions for matching data of client and of server.
  if (result.info === textPost.info) {
    console.log("This is the SAME answer!")
  }
  else {
    console.log("NOT SAME answer !!!")
  }

  // Passed time for obtaining a response from server.
  console.log("Elapsed time is " + (endTime - startTime).toFixed(2) + " milliseconds");
}

sendRequest();


/* TCP Client */

import net from 'net'

const port = 3001;
const host = 'localhost';
  
// Text from Client to Server
let textPostTcp = "Hello, servere!";

// Makes soket for client (must have to protocol TCP)
const client = new net.Socket();

// Fixes start time of process passing data to server.
const startTime = performance.now();

// Connection to tcp-server
client.connect(port, host, ()=> {

  // Passing info to server
  client.write(textPostTcp);

});

// Now listen response from server
client.on('data', (data) => {
  
  let response = data.toString();

  // Fixes end time after receiving response from server.
  const endTime = performance.now();
  
  console.log("---TCP protocol---")

  if (response === textPostTcp) {
    
    console.log ("YES! We got the same answer from TCP server!")
  } else {

    console.log("NO!!! An answer from TCP server is different from our request.")

  }

  // Passed time for obtaining a response from server.
  console.log("Elapsed time is " + (endTime - startTime).toFixed(2) + " milliseconds");

  // Close the connection after receiving the response
  client.end();
})

// npm run build && npm run myRunClients