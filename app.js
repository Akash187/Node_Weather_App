const request = require('request');
const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
     demand: true,
     alias: 'address',
     describe: 'Address to fetch weather for',
      string: true
    }
  }).help()
  .alias('help', 'h')
  .argv;

let address = argv.a;
console.log(encodeURIComponent(address));

const key = JSON.parse(fs.readFileSync('keys.json')).mapQuestKey;

let options = {
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodeURIComponent(address)}`,
  json: true
};

function callback(error, response, body) {
  if (error) {
    console.log('Unable to fetch data from MapQuest API. Check your Network Connection.');
  }else if(body.info.statuscode === 400) {
    console.log('Unable to find that address');
  }else {
    //console.log(JSON.stringify(body, undefined, 2));
    // console.log(`Address : ${body['results'][0]['formatted_address']}`);
    console.log(body.info.statuscode);
    console.log(`Latitude : ${body['results'][0]['locations'][0]['latLng']['lat']}`);
    console.log(`Longitude : ${body['results'][0]['locations'][0]['latLng']['lng']}`);
  }
}

request(options, callback);