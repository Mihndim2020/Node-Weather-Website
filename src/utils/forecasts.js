const request = require("request");

const forecasts = (a, b, callback) => {
  const lat = a.toString();
  const long = b.toString();
  console.log(lat, long);
  const url = `http://api.weatherstack.com/current?access_key=cffb2ba07c05d270031a5a2d8b7081fe&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, response) => {
    const { body } = response;
    // const { error } = body;
    if (error) {
      callback("Network error, unable to connect", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location, checkout your coordinates and try again",
        undefined
      );
    } else {
      const { current } = body;
      const { temperature, feelslike, precip, weather_descriptions } = current;
      const weather = weather_descriptions[0];
      // const temperature = response.body.current.temperature;
      // const feels_like = response.body.current.feelslike;
      // const precipitation = response.body.current.precip;
      // const weather_description = response.body.current.weather_descriptions[0];

      callback(undefined, {
        temperature,
        feelslike,
        precip,
        weather,
      });
    }
  });
};

module.exports = forecasts;

// const url =
//   "http://api.weatherstack.com/current?access_key=cffb2ba07c05d270031a5a2d8b7081fe&query=37.8267,-122.4233&units=f";
// request({ url, json: true }, (error, response) => {
//   // console.log(response);
//   // const data = JSON.parse(response.body);
//   // console.log(data.current);
//   // console.log(response.body.location.name);
//   // console.log(response.body.current);
//   // console.log(response);
//   if (error) {
//     console.log("Unable to connect to server !");
//   } else if (response.body.error) {
//     console.log("Unable to find location");
//   } else {
//     console.log(
//       `It is currently ${response.body.current.temperature} degreese outside, but it feels like ${response.body.current.feelslike} degrees and there is a ${response.body.current.precip} % chance of raining and the weather description is ${response.body.current.weather_descriptions[0]}`
//     );
//   }
// });
