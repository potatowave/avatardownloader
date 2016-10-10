var fs = require('fs');

input = process.argv.slice(2);
const owner = input[0];
const repo = input[1];
const request = require('request');
const httpOptions = {
  url: 'https://api.github.com/repos/' + owner + '/' + repo + "/contributors",
  method: 'GET',
  headers: {
    'User-Agent': 'request'
  },
  json: true
};

function downloadImageByURL(url, filePath) {

  request(url).pipe(fs.createWriteStream(filePath));

}

const handleResponse = (err, res, data) => {
  if (err || res.statusCode == "404") {
    console.log("You broke it:", res.statusCode);
    return false;
  }

  // iterate over the users and get username and URL to the avatar, dowload it and save
  // it under /avatars/{repo}-{user}/

  for (var i = 0; i < data.length; i++) {

    var login = data[i].login;
    var avatarURL = data[i].avatar_url;
    downloadImageByURL(avatarURL, 'avatars/' + repo + "-" + login + '.jpg');
    console.log('Saved ' + login + '\'s avatar in avatars/' + login + '.jpg');
  }


}


request(httpOptions, handleResponse);

