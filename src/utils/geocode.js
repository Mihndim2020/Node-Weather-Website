const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlobmRpbSIsImEiOiJjbGc4Y3VxMGMwc2p6M21xeXh1bTlzeDFjIn0.o9MmsRzMUblrZilu7W9SsQ&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, Please try another search", undefined);
    } else {
      const { body } = response;
      const { features } = body;

      const latitude = features[0].center[0];
      const longitude = features[0].center[1];
      const place_name = features[0].place_name;
      // const latitude = response.body.features[0].center[0];
      // const longitude = response.body.features[0].center[1];
      // const place_name = response.body.features[0].place_name;
      callback(undefined, { longitude, latitude, place_name });
    }
  });
};

module.exports = geocode;

// const addressUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWlobmRpbSIsImEiOiJjbGc4Y3VxMGMwc2p6M21xeXh1bTlzeDFjIn0.o9MmsRzMUblrZilu7W9SsQ&limit=1";

// request({ url: addressUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Network error, unable to connect");
//   } else if (response.body.features.length === 0) {
//     console.log("Search location not found, please try with new search terms");
//   } else {
//   }
//   const longitude = response.body.features[0].center[0];
//   const latitude = response.body.features[0].center[1];
//   console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
// });
