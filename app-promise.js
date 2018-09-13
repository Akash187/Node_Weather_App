const yargs = require('yargs');
const rp = require('request-promise-native');
const fs = require('fs');

const weatherKey = JSON.parse(fs.readFileSync('./keys.json'))['weatherKey'];


const argv = yargs
  ['options']({
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

const mapQuestkey = JSON.parse(fs.readFileSync('./keys.json'))['mapQuestKey'];

rp({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestkey}&location=${encodeURIComponent(address)}`,
  json: true
}).then((body) => {
  console.log(body['results'][0]['locations'][0]['latLng']['lat']);
    let latitude = body['results'][0]['locations'][0]['latLng']['lat'];
    let longitude = body['results'][0]['locations'][0]['latLng']['lng'];
    return rp({
      url : `https://api.forecast.io/forecast/${weatherKey}/${latitude},${longitude}`,
      json : true
    });
}).then((res) => {
  console.log(res);
  console.log(`It's currently ${res['currently']['temperature']}. But it feels like ${res['currently']['apparentTemperature']}.`);
}).catch(() => {
  console.log('Error Fetching Weather for the given location.');
});



