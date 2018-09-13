const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }else {
    console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(results['latitude'], results['longitude'], (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        let result = weatherResult;
        console.log(result);
        console.log(`It's currently ${result.currentTemperature}. But it feels like ${result.apparentTemperature}.`);
      }
    });
  }
});



