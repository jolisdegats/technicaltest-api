const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.use(chaiHttp);

agent = chai.request.agent(server);
assert = require("assert");
expect = chai.expect;

describe("## Stations ##", () => {
  require("./test-routes/test-stations");
});
describe("## Cars ##", () => {
  require("./test-routes/test-cars");
});
