/*The purpose of this program is for the user to input an addres using yargs.
The yargs input will be parsed, using the Google Maps API the following request
will return the lat and long and eventually the local weather report.
*/

const yargs = require('yargs');

let geocode = require('./geocode/geocode');

let weather = require('./weatherinfo/weatherinfo');

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


geocode.getResults(argv.address, (errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    // console.log(JSON.stringify(results,undefined,2))
    console.log();
    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage);
      }
      else{
        console.log(`currently the weather is ${weatherResults.temperature}, however it feels like it's ${weatherResults.actualTemp}`);
      }

    });
  }
});
