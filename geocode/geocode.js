const request = require('request');
const fs = require('fs');

const key = JSON.parse(fs.readFileSync('./keys.json')).mapQuestKey;

let geocodeAddress = (address, callback) => {
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to fetch data from MapQuest API. Check your Network Connection.');
    }else if(body['info']['statuscode'] === 400) {
      callback('Unable to find that address');
    }else {
      //console.log(JSON.stringify(body, undefined, 2));
      // console.log(`Address : ${body['results'][0]['formatted_address']}`);
      //console.log(body['info']['statuscode']);
      callback(undefined, {
        latitude : body['results'][0]['locations'][0]['latLng']['lat'],
        longitude : body['results'][0]['locations'][0]['latLng']['lng']
      });
    }
});
};

module.exports = {
  geocodeAddress
};