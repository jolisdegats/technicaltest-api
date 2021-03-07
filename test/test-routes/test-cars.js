it("2.1 Should add new car", () => {
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

it("2.2 Should get all cars", () => {
  return agent
    .get("/cars/")
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    })
    .catch(() => {
      expect.fail();
    });
});
