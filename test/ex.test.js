const axios = require("axios");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getAemetStation/";

describe("ODWeather API - getAemetStation - endpoint", function () {
  //this.timeout(10000);

  // Helper: Axios instance with base URL and headers
  const api = axios.create({
    baseURL: BASE_URL,
    headers: defaultHeaders,
    validateStatus: () => true, // Prevent axios from throwing on 4xx/5xx
  });

  // ✅ Valid Stations
  for (const stationId of stations.validStations) {
    it(`should return 200 OK and valid data for station "${stationId}"`, async () => {
      const url = `${API_PREFIX}${stationId}/lastdata/`;
      console.log(`${BASE_URL}${url}`);

      const res = await api.get(url);

      expect(res.status).to.equal(200);
      expect(res.data).to.be.an("object");
    });
  }

  // 🚫 Invalid Stations
  for (const stationId of stations.invalidStations) {
    it(`should return an error object for invalid station "${stationId}"`, async () => {
      const url = `${API_PREFIX}${stationId}/lastdata/`;
      const res = await api.get(url);

      expect([200, 404]).to.include(res.status);
      expect(res.data).to.be.an("object");
      if (res.status === 200) {
        expect(res.data).to.have.property("error");
      }
    });
  }

  // ✅ Valid Periods
  for (const period of stations.validPeriods) {
    it(`should return 200 OK for valid period "${period}"`, async () => {
      const url = `${API_PREFIX}aeropuertopalma/${period}/`;
      const res = await api.get(url);

      expect(res.status).to.equal(200);
      expect(res.data).to.be.an("object");
    });
  }

  // 🚫 Invalid Periods
  for (const period of stations.invalidPeriods) {
    it(`should return an error for invalid period "${period}"`, async () => {
      const url = `${API_PREFIX}aeropuertopalma/${period}/`;
      const res = await api.get(url);

      expect([200, 404]).to.include(res.status);
      expect(res.data).to.be.an("object");
      if (res.status === 200) {
        expect(res.data).to.have.property("error");
      }
    });
  }
});
