const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=10ce9d60323b59c1594ae99c32cadfa9&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const temp = body.current.temperature,
        feels = body.current.feelslike,
        humidity = body.current.humidity;
      const str = `${body.current.weather_descriptions[0]}. It is currently ${temp} degrees out. It feels like ${feels} degrees out. The humidity is ${humidity}%.`;
      callback(undefined, str);
    }
  });
};

module.exports = forecast;
