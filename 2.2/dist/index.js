"use strict";
/*   TASK   1 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        let myPromise = yield fetch(params); // receiving data from server
        let myId = yield myPromise.json().then(myPromise => { return myPromise.ip; }); // translate received data to json
        console.log("Task 2: " + myId);
        return myId;
    });
}
getMyIP(url);
/*   TASK 3   */
const url1 = "https://random-data-api.com/api/name/random_name";
function getNames1(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let firstPromise = (yield fetch(params)).json();
        let secondPromise = (yield fetch(params)).json();
        let thirdPromise = (yield fetch(params)).json();
        let response = yield Promise.all([firstPromise, secondPromise, thirdPromise]);
        let names = response.map((n) => " " + n.name).toString();
        console.log("Task 3:" + names);
        return names;
    });
}
getNames1(url1);
// npm run build && npm run start
