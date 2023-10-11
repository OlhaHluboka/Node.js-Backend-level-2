/* HTTP request. */

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

  // Obtains an answer from server we connect.
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

// npm run build && npm run myRunClients