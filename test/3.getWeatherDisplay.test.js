const axios = require("axios");
const { BASE_URL, HEADERS } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getWeatherDisplay/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

describe("ODWeather API - getWeatherDisplay - endpoint", function () {
  this.timeout(20000); // give API time to respond

  // Create an Axios instance with base URL and headers
  const api = axios.create({
    baseURL: BASE_URL,
    headers: HEADERS,
    validateStatus: () => true, // don’t throw for non-2xx responses
  });

  stations.validStationName.forEach((stationName) => {
    it(`should return 200 response for valid station name ${stationName}`, async () => {
      const url = `${API_PREFIX}${stationName}/?period=latestdata/`;
      console.log(`${BASE_URL}${url}`);

      const res = await api.get(url);

      // Assertions
      expect(res.status).to.equal(200);
      expect(res.data).to.be.an("object");
    });
  });
});
