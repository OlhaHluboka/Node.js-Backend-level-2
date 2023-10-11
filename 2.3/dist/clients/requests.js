/* HTTP request. */
async function sendRequest() {
    let url1 = "http://localhost:3000/";
    let textPost = {
        id: "First fetch",
        info: "Hello, server!"
    };
    const startTime = performance.now();
    const response = await fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(textPost)
    });
    let result = await response.json();
    const endTime = performance.now();
    console.log("---HTTP protocol---");
    if (result.info === textPost.info) {
        console.log("This is the SAME answer!");
    }
    else {
        console.log("NOT SAME answer !!!");
    }
    console.log("Elapsed time is " + (endTime - startTime).toFixed(2) + " milliseconds");
}
sendRequest();
export {};
// npm run build && npm run myRunClients
