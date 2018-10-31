/*The purpose of this program is for the user to input an addres using yargs.
The yargs input will be parsed, using the Google Maps API the following request
will return the lat and long and eventually the local weather report.
*/

const yargs = require('yargs');
const axios = require('axios');
const argv = yargs.option({
  address:{
    demand: true,
    alias: 'a',
    describe: 'Address for the weather',
    string: true
  }
})
  .help()
  .alias('help', 'h')
  .argv;

  let encodedaddress = encodeURIComponent(argv.address);
  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

  axios.get(geocodeUrl).then((response) => {
    if(response.data.status==='ZERO_RESULTS'){
      throw new Error('Unable to find address');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherinfo =  `https://api.darksky.net/forecast/831d6b9cc3dba230ada7a14bdb0c0a9b/${lat},${lng}`;
    console.log(response.data.result[0].formatted_address);
    return axios.get(weatherinfo);
  }).then((response) => {
    let currentTemp = response.data.currently.temperature;
    let apparentTemp = response.data.currently.apparentTemperature;

    console.log(`It's currently ${currentTemp}, however it feels like ${apparentTemp}.`);
  }).catch((e) => {
    if(e.code==='ENOTFOUND'){
      console.log('unable to connect');
    }
    else{
      console.log(e.message);
    }
  });
