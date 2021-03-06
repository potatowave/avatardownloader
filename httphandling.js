// require request to deal with our http requests

var request = require('request');

// require image which takes in a URL and a local
// file path to save the .jpg file presented from
// the git API

var downloadImageByURL = require('./downloadimage');

// HTTP object / method and token.

module.exports = function(owner, repo) {

  var httpConfig = {
    url: 'https://api.github.com/repos/' + owner + '/' + repo + '/contributors',
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + 'e54941d9155c7f2ea642869ec0024b0c1fa5a3ae'
    },
    json: true
  };

  //  pass in httpConfig and define callback function.

  request(httpConfig, function (err, res, data) {
    if (err || res.statusCode == "404") {
      console.log("Error code:", res.statusCode);
      return false;
    }


    // iterate over the users and get username and URL to the avatar, download it and save
    // it under /avatars/{repo}-{user}/

    // forEach

    data.forEach(function (value, index, array) {

      var login = data[index].login;
      var avatarURL = data[index].avatar_url;

      downloadImageByURL(avatarURL, 'avatars/' + repo + "-" + login + '.jpg');

      // console log the user and path to the file relative to the working directory.

      console.log(' >>>    Saved ' + login + '\'s avatar in avatars/' + login + '.jpg');
    });
  });

};