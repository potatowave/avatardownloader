var request = require('request');
var fs = require('fs');

//  downloadImageByURL takes two arguments, first the URL you want to download and
//  then the path the file will be written to.  No type is specified here.
//  Note this is not an API request, it is downloading an link *from* the API.

module.exports = function (url, filePath) {

 request(url).pipe(fs.createWriteStream(filePath));

}
