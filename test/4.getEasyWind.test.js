const axios = require("axios");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getEasyWind/";

describe("ODWeather API - getEasyWind - endpoint", function () {
  this.timeout(10000);

  // ✅ Helper function for GET requests
  const getRequest = async (url) => {
    try {
      const response = await axios.get(url, { headers: defaultHeaders });
      return response;
    } catch (error) {
      // Return full error response (like supertest)
      return error.response || { status: 500, data: { error: error.message } };
    }
  };

  // ✅ Valid stations
  stations.validWindStations.forEach((stationId) => {
    it(`should return 200 response for valid station ${stationId}`, async () => {
      const url = `${BASE_URL}${API_PREFIX}${stationId}/?period=latestdata/`;
      const response = await getRequest(url);

      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("object");
    });
  });

  // ✅ Invalid stations
  stations.invalidStations.forEach((stationId) => {
    it(`should return error for invalid station ${stationId}`, async () => {
      const url = `${BASE_URL}${API_PREFIX}${stationId}/?period=latestdata/`;
      const response = await getRequest(url);

      expect(response.status).to.equal(200); // If API always returns 200 with error object
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.property("error");
      expect(response.data.error).to.match(/not implemented/i);
    });
  });

  // ✅ Valid periods
  stations.validPeriods.forEach((period) => {
    it(`should return 200 response for valid period ${period}`, async () => {
      const url = `${BASE_URL}${API_PREFIX}EW013/?period=${period}/`;
      const response = await getRequest(url);

      expect(response.status).to.equal(200);
      expect(response.data).to.be.an("object");
    });
  });

  // ✅ Invalid periods
  stations.invalidPeriods.forEach((period) => {
    it(`should return error for invalid period ${period}`, async () => {
      const url = `${BASE_URL}${API_PREFIX}EW013/?period=${period}/`;
      const response = await getRequest(url);

      expect(response.status).to.equal(200); // again if API uses 200 + error body
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.property("error");
      expect(response.data.error).to.match(/not implemented/i);
    });
  });
});
