var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*   TASK   1 */
import fetch from "node-fetch";
const url = "https://api.ipify.org/?format=json";
/* const ip1 = fetch(url)
    .then(data => data.json())
    .then(data => console.log("Promise is done: " + data.ip))
    .catch(e => console.log("fail"));

console.log("Waiting Process of Promise " + ip1); */
const ip2 = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let request = yield fetch(params);
    let data = yield request.json();
    console.log("Task 1: " + data.ip);
});
ip2(url);
/*   TASK 2   */
function getMyIP(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetch(params); // receiving data from server
        let myId = yield data.json().then(myObject => { return myObject.ip; }); // translate received data to json
        console.log("Task 2: " + myId);
        return myId;
    });
}
getMyIP(url);
/*   TASK 3   */
// a: With Promise.all
const url1 = "https://random-data-api.com/api/name/random_name";
function getNames1(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let firstPromise = (yield fetch(params)).json().catch(console.log.bind(console));
        let secondPromise = (yield fetch(params)).json().catch(console.log.bind(console));
        let thirdPromise = (yield fetch(params)).json().catch(console.log.bind(console));
        let response = yield Promise.all([firstPromise, secondPromise, thirdPromise]);
        let names = response.map((n) => " " + n.name).toString();
        console.log("Task 3-a:" + names);
        return names;
    });
}
getNames1(url1);
// b: Without Promise.all
const urls = [
    "https://random-data-api.com/api/name/random_name",
    "https://random-data-api.com/api/name/random_name",
    "https://random-data-api.com/api/name/random_name"
];
function getNames2(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let responses = [];
        try {
            for (let request of params) {
                let result = yield fetch(request);
                let myjson = yield result.json();
                responses.push(myjson.name);
            }
        }
        catch (err) {
            console.log(err);
        }
        console.log("Task 3-b: " + responses.toString());
        return responses.toString;
    });
}
getNames2(urls);
// c: Without Promise.all and without async/await: polifil for Promise.All
function getArrayOfAllPromises(params) {
    let prms = []; // for array of promises
    params.forEach((ip) => {
        let one = fetch(ip).then(str => { return str.json(); }).then(nm => { return nm.name; }).catch(e => { console.log(e); });
        prms.push(one);
    });
    return prms;
}
function getPromises(promises) {
    const arrayOfStrings = [];
    let promise = new Promise((resolve, reject) => {
        promises.forEach((prm) => {
            prm.then((str) => {
                arrayOfStrings.push(str);
                if (arrayOfStrings.length === promises.length) {
                    resolve(arrayOfStrings);
                }
            }).catch(error => reject(console.log(error)));
        });
    });
    promise.then(names => console.log("Task 3-c: " + names));
    return promise;
}
getPromises(getArrayOfAllPromises(urls));
/*   TASK 4   */
// a: Without async/await
const url2 = "https://random-data-api.com/api/users/random_user";
let count1 = 0;
let count2 = 0;
/**
 * This function creates and returns a promise, which will fulfill when come a request
 * from server we appeal.
 * @param address - a string with url of server.
 * @returns - a promise resolved an information from server.
 */
function getGender(address) {
    let promise = new Promise((resolve, reject) => {
        fetch(address)
            .then(receivedData => { return receivedData.json(); })
            .then(receivedString => { resolve(receivedString.gender); })
            .catch(error => reject(console.log(error)));
    });
    return promise;
}
/**
 * Contains a recursive request to server for obtaining needed information about gender "Female".
 * @param gender - result of fulfilling a promise to fetch an info from server;
 * @returns - string with count of trying to get femail and gender "Female";
 */
function getFemale(gender) {
    return gender.then(gnd => {
        count1++;
        if (gnd === "Female") {
            console.log(`Task 4-a: ${count1} requests need to obtain a gender ` + gnd + ' from server.');
        }
        else {
            getFemale(getGender(url2));
        }
    }).catch(e => console.log(e));
}
getFemale(getGender(url2));
// b: With async/await
/**
 * This is an asyncronic function which returns a fulfilled promise.
 * With world "await" JS waiting for the promise fulfills.
 * Promise is a fetch to server by url and get string data about a gender.
 * @param server - url of server;
 * @returns - fulfilled promise.
 */
function getResponse(server) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(server).then(str => { return str.json(); }).then(gndr => { return gndr.gender; }).catch(e => (console.log(e)));
    });
}
/**
 * Recursive function which seeks a femsle gender from responses by server we apeal.
 * @param gender1 - fulfilled promise with result is a gender one.
 * @returns - a string with female gender or recursive apeaal to server.
 */
function getResult(gender1) {
    return __awaiter(this, void 0, void 0, function* () {
        count2++;
        return gender1.then(gnd => {
            if (gnd === "Female") {
                console.log(`Task 4-b: Need to pass ${count2} times to fetch a gender ` + gnd);
            }
            else {
                getResult(getResponse(url2));
            }
        });
    });
}
getResult(getResponse(url2));
/*   TASK 5   */
function function2GetMyIP(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(ip).then(str => { return str.json(); }).then(myIp => { return myIp.ip; }).catch(e => (console.log(e)));
    });
}
function function1(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let myIp = yield function2GetMyIP(url);
        callback(myIp);
    });
}
function callback(param) {
    console.log("Task 5: " + param);
}
function1(callback);
/*   TASK 6   */
function func1GetMyIp(myUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(myUrl).then(str => { return str.json(); }).then(myIp => { return myIp.ip; }).catch(e => (console.log(e)));
    });
}
function func2(callback1) {
    return __awaiter(this, void 0, void 0, function* () {
        let myIp = yield func1GetMyIp(url);
        callback1(myIp);
    });
}
function callback1(param1) {
    console.log("Task 6: " + param1);
}
func2(callback1);
// npm run build && npm run start
