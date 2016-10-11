
var fs = require('fs');
var request = require('request');

// main input of program from node.js.  Array is sliced to leave the data we need.

input = process.argv.slice(2);

// "Owner" is input at array index 0

const owner = input[0];

// Report is input at array index 1

const repo = input[1];

// httpOptions parses the URL with the owner and repo and defines a request to
// the github API.

const httpOptions = {
  url: 'https://api.github.com/repos/' + owner + '/' + repo + "/contributors",
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  },
  json: true
};

//  downloadImageByURL takes two arguments, first the URL you want to download and
//  then the path the file will be written to.  No type is specified here.

function downloadImageByURL(url, filePath) {

  request(url).pipe(fs.createWriteStream(filePath));

}

// the callback function of request deals with the returned data by filtering for 404
// errors with an if statement.

function handleResponse (err, res, data) {
  if (err || res.statusCode == "404") {
    console.log("Error code:", res.statusCode);
    return false;
  }

  // iterate over the users and get username and URL to the avatar, dowload it and save
  // it under /avatars/{repo}-{user}/

  for (var i = 0; i < data.length; i++) {

    var login = data[i].login;
    var avatarURL = data[i].avatar_url;
    downloadImageByURL(avatarURL, 'avatars/' + repo + "-" + login + '.jpg');

    // console log the user and path to the file relative to the working directory.

    console.log(' >>>    Saved ' + login + '\'s avatar in avatars/' + login + '.jpg');
  }

}

// call the function.

console.log("Downloading avatars of: \n" + httpOptions.url + "\n");

request(httpOptions, handleResponse);

// have pictures.