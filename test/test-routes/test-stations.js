it("1.1 Should create a station", () => {
  let newStation = {
    name: "my_new_station",
  };

  return agent
    .put("/station/create")
    .send(newStation)
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch(() => {
      expect.fail();
    });
});

it("1.2 Should not create a station", () => {
  // Name is too short
  let newStation = {
    name: "my",
  };

  return agent
    .put("/station/create")
    .send(newStation)
    .then((res) => {
      expect(res.statusCode).to.equal(400);
    })
    .catch(() => {
      expect.fail();
    });
});

it("1.3 Should get all stations", () => {
  return agent
    .get("/stations/")
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch(() => {
      expect.fail();
    });
});

it("1.4 Should update a station", () => {
  var task = server.db("tasks").first();
  return agent
    .post("/tasks/" + task.id)
    .send({ name: "patate" })
    .expect(201)
    .end(function (err, res) {
      done(err);
    });
});
