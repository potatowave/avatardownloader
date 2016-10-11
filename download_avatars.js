// require http.js.
var http = require('./http');

input = process.argv.slice(2);
const ownerInput = input[0];
const repoInput = input[1];

console.log(http(ownerInput, repoInput));