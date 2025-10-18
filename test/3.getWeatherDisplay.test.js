const request = require('supertest');
const { BASE_URL, HEADERS } = require("./setup");
//const BASE_URL = process.env.BASE_URL;
//const { BASE_URL } = require("./setup");
const API_PREFIX = "/v1.0/getWeatherDisplay/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import station IDs from external file
const stations = require("../data/stations.json");

describe('ODWeather API - getWeatherDisplay - endpoint', function () {
  this.timeout(20000); // give API time to respond

  stations.validStationName.forEach((stationName) => {
    it(`should return 200 response for valid station name ${stationName}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationName}/?period=latestdata/`);
        console.log(`${BASE_URL}${API_PREFIX}${stationName}/?period=latestdata`)

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});
});