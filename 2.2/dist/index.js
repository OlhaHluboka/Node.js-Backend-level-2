"use strict";
/* Task 1 */
const url = "https://api.ipify.org/?format=json";
const ip1 = fetch(url).then(data => data.json()).then(data => console.log("111  " + data.ip)).catch(e => console.log("fail"));
console.log("8888 " + ip1);
// npm run build && npm run start
