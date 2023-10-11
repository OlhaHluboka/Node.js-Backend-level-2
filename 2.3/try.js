import fetch from "node-fetch";


/* HTTP client*/

const url1 = "http://localhost:3000/";


let textPost = {
    id: "My first request",
    info: "Hello, server!"
};

// Function for sending to server text "Hello, server!"

async function sendRequest() {
    
    // Variable contains a promise of receiving a result (object) of post request.
    let request1 = await fetch(url1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(textPost)
      });
    
     let result = await request1.json();
     console.log ("ggg " + result.headers);

     console.log("--------------HTTP protocol")

    /* if (result.info === textPost.info) {
      console.log("yep, it is the same")
    }
    else{console.log("ou, not the same")} */
}
sendRequest();