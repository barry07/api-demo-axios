const chai = require("chai");
//const chaiAsPromised = require("chai-as-promised");
const chaiAsPromised = require("chai-as-promised").default || require("chai-as-promised");

chai.use(chaiAsPromised);
global.expect = chai.expect;

require("dotenv").config();
const BASE_URL = process.env.BASE_URL?.replace(":443", "");

if (!BASE_URL) {
  throw new Error("❌ BASE_URL not found in .env");
}

const defaultHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Accept": "application/json,text/html;q=0.9",
  "Accept-Language": "en-US,en;q=0.9",
};

// ✅ Export everything together correctly
module.exports = {
  BASE_URL,
  defaultHeaders,
  mochaHooks: {
    beforeAll(done) {
      this.timeout(10000);
      done();
    },
  },
};
