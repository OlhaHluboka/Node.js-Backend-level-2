/* Task 1 */

const url:string = "https://api.ipify.org/?format=json";

const ip1 = fetch(url).then(data => data.json()).then(data => console.log("Promise is done: " + data.ip)).catch(e => console.log("fail"));

console.log("Waiting Process of Promise "+ ip1);

  

  // npm run build && npm run start