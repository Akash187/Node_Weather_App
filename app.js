const request = require('request');
const fs = require('fs');

const key = JSON.parse(fs.readFileSync('keys.json')).mapQuestKey;

let options = {
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=1301%20lombard%20street%20philadelphia`,
  json: true
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(response);
    // console.log(`Address : ${body['results'][0]['formatted_address']}`);
    console.log(`Latitude : ${body['results'][0]['locations'][0]['latLng']['lat']}`);
    console.log(`Longitude : ${body['results'][0]['locations'][0]['latLng']['lng']}`);
  }
}

request(options, callback);