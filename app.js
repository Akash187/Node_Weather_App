const request = require('request');
const fs = require('fs');

const key = JSON.parse(fs.readFileSync('keys.json')).geocodeKey;

let options = {
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=1301%20lombard%20street%20philadelphia`,
  json: true
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(`Address : ${body['results'][0]['formatted_address']}`);
    console.log(`Latitude : ${body['results'][0]['geometry']['location']['lat']}`);
    console.log(`Longitude : ${body['results'][0]['geometry']['location']['lng']}`);
  }
}

request(options, callback);