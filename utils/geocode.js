const request = require("postman-request");
const geoCode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmVhc3QxIiwiYSI6ImNrcm5nenRxeTE1eWgzMGw3aXZuMW5lOGUifQ.ROcw7dhkFVmlkC7Ci5_Giw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to location services!", undefined);
    } else {
      const features = body.features[0];
      if (!features) {
        callBack("Unable to find location", undefined);
      } else {
        const coordinates = features.center;
        callBack(undefined, {
          longitude: coordinates[0],
          latitude: coordinates[1],
          location: features.place_name,
        });
      }
    }
  });
};
module.exports = geoCode;
