/*   TASK   1 */
import fetch from "node-fetch";


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

    let data = await fetch(params); // receiving data from server

    let myId = await data.json().then(myObject => { return myObject.ip }) // translate received data to json

    console.log("Task 2: " + myId);

    return myId;
}

getMyIP(url);


/*   TASK 3   */

// With Promise.all

const url1 = "https://random-data-api.com/api/name/random_name";

async function getNames1(params: string) {

    let firstPromise = (await fetch(params)).json().catch(console.log.bind(console));
    let secondPromise = (await fetch(params)).json().catch(console.log.bind(console));
    let thirdPromise = (await fetch(params)).json().catch(console.log.bind(console));

    let response = await Promise.all([firstPromise, secondPromise, thirdPromise])

    let names = response.map((n) => " " + n.name).toString();

    console.log("Task 3-a:" + names);

    return names;

}

getNames1(url1);

// Without Promise.all
const urls = [
    "https://random-data-api.com/api/name/random_name",
    "https://random-data-api.com/api/name/random_name",
    "https://random-data-api.com/api/name/random_name"];

async function getNames2(params: string[]) {

    let responses = [];

    try {
        for (let request of params) {
            let result = await fetch(request);
            let myjson = await result.json();
            responses.push(myjson.name);
        }

    } catch (err) {
        console.log(err);
    }

    console.log("Task 3-b: " + responses.toString())

    return responses.toString;
}

getNames2(urls);

// Without Promise.all and without async/await: polifil for Promise.All

function getArrayOfAllPromises(params: string[]) {

    let prms: any = [];

        params.forEach((ip) => {
            let one = fetch(ip).then(str => { return str.json() }).then(nm => { return nm.name }).catch(e => { console.log(e) });
            prms.push(one)
        })
    
    return prms;
}

function getPromises(promises:any) {
    
    const arrayOfStrings:string[] = [];

    
    let promise = new Promise((resolve, reject) => {

        promises.forEach((prm:any) => {
            prm.then((str:string) => {

                arrayOfStrings.push(str);

                if (arrayOfStrings.length === promises.length) {
                    resolve(arrayOfStrings);
                }
            })
        })
    })

    promise.then(names => console.log("Task 3-c: " + names));

    return promise;
}

getPromises(getArrayOfAllPromises(urls));

// npm run build && npm run start