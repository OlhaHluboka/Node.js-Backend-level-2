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
// With Promise.all
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
// Without Promise.all
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
// Without Promise.all and without async/await: polifil for Promise.All
function getArrayOfAllPromises(params) {
    let prms = [];
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
            });
        });
    });
    promise.then(names => console.log("Task 3-c: " + names));
    return promise;
}
getPromises(getArrayOfAllPromises(urls));
// npm run build && npm run start
