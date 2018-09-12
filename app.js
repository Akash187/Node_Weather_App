const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const request = require('request');

const fs = require('fs');

const weatherkey = JSON.parse(fs.readFileSync('./keys.json')).weatherKey;

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

// geocode.geocodeAddress(address, (errorMessage, results) => {
//   if(errorMessage){
//     console.log(errorMessage);
//   }else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

request({
  url : `https://api.forecast.io/forecast/${weatherkey}/40.285751,-75.207815`,
  json : true
}, (error, response, body) => {
  if(!error && response.statusCode === 200) {
    console.log(body['currently']['temperature']);
  } else {
    console.log('Unable to fetch data from Forecast.io server');
  }
});
