const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.use(chaiHttp);

agent = chai.request.agent(server);
assert = require("assert");
expect = chai.expect;

it("1. Should get all cars", () => {
  return agent
    .get("/cars/")
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch(() => {
      expect.fail();
    });
});

it("2. Should add new car", () => {
  let car = {
    name: "mpppo",
    station_id: "6044aa1abd14c90a54f976fc",
    available: true,
  };

  return agent
    .put("/car/create")
    .send(car)
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch((err) => {
      expect.fail();
      console.log(err);
    });
});

it("3. Should get all stations", () => {
  return agent
    .get("/stations/")
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch(() => {
      expect.fail();
    });
});
