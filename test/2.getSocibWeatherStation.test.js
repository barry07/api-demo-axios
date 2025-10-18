const axios = require("axios");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getSocibWeatherStation/";

if (!BASE_URL) {
  throw new Error("❌ BASE_URL not found. Ensure it is defined in your .env file.");
}

describe("ODWeather API - getSocibWeatherStation - endpoint", function () {
  this.timeout(10000); // Allow enough time for API responses

  // Create a preconfigured axios instance
  const api = axios.create({
    baseURL: BASE_URL,
    headers: defaultHeaders,
    validateStatus: () => true, // prevent axios throwing for 4xx/5xx
  });

  // ✅ Valid Buoy Stations
  stations.validBouyStations.forEach((stationId) => {
    it(`should return 200 OK for valid buoy station "${stationId}"`, async () => {
      const url = `${API_PREFIX}${stationId}/latestdata/`;
      console.log(`Testing: ${BASE_URL}${url}`);

      const res = await api.get(url);

      expect(res.status).to.equal(200);
      expect(res.data).to.be.an("object");
    });
  });

  // 🚫 Invalid Stations
  stations.invalidStations.forEach((stationId) => {
    it(`should return 404 or error object for invalid buoy station "${stationId}"`, async () => {
      const url = `${API_PREFIX}${stationId}/latestdata/`;
      console.log(`Testing invalid: ${BASE_URL}${url}`);

      const res = await api.get(url);

      // Some APIs return 200 with an error message; others return 404
      expect([200, 404]).to.include(res.status);
      expect(res.data).to.be.an("object");

      if (res.status === 200) {
        expect(res.data).to.have.property("error");
      }
    });
  });
});
