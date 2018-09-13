const request = require('request');
const fs = require('fs');

const weatherKey = JSON.parse(fs.readFileSync('./keys.json'))['weatherKey'];

let getWeather = (lat, lng, callback) => {
  request({
    url : `https://api.forecast.io/forecast/${weatherKey}/${lat},${lng}`,
    json : true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {currentTemperature : body['currently']['temperature'], apparentTemperature : body['currently']['apparentTemperature']});
    } else {
      callback('Unable to fetch data from Forecast.io server');
    }
  });
};

module.exports = {
  getWeather
};