/*   TASK   1 */

const url: string = "https://api.ipify.org/?format=json";

/* const ip1 = fetch(url)
    .then(data => data.json())
    .then(data => console.log("Promise is done: " + data.ip))
    .catch(e => console.log("fail"));

console.log("Waiting Process of Promise " + ip1); */

const ip2 = async (params: string) => {
    
    let request = await fetch(params);
    let data = await request.json();
    console.log("Task 1: " + data.ip)
}

ip2(url);


/*   TASK 2   */

async function getMyIP(params: string) {

    let myPromise = await fetch(params); // receiving data from server

    let myId = await myPromise.json().then(myPromise => { return myPromise.ip }) // translate received data to json

    console.log("Task 2: " + myId);

    return myId;
}

getMyIP(url);


/*   TASK 3   */

const url1 = "https://random-data-api.com/api/name/random_name";

async function getNames1(params:string) {

    let firstPromise = (await fetch(params)).json();
    let secondPromise = (await fetch(params)).json();
    let thirdPromise = (await fetch(params)).json();

    let response = await Promise.all([firstPromise, secondPromise, thirdPromise])

    let names = response.map((n) => " " + n.name).toString();

    console.log("Task 3:" + names);

    return names;
    
}

getNames1(url1);



// npm run build && npm run start