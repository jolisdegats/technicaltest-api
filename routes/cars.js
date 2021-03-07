const express = require("express");
const router = express.Router();

const Car = require("../models/Car");
const Station = require("../models/Station");

// Create car
router.put("/car/create", async (req, res) => {
  try {
    const carStation = await Station.findById(req.fields.station_id);
    if (carStation) {
      const newCar = new Car({
        name: req.fields.name,
        available: req.fields.available,
        station: carStation,
      });
      const savedCar = await newCar.save();

      carStation.update({ cars: carStation.cars.push(savedCar) });
      await carStation.save();

      res.status(200).json({ message: "Car created" });
    } else {
      res.status(400).json({ error: "This station does not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all cars
router.get("/cars", async (req, res) => {
  try {
    const carsList = await Car.find();
    res.status(200).json(carsList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one car by id
router.get("/car/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update car
router.post("/car", async (req, res) => {
  try {
    if (req.fields.id) {
      const car = await Car.findOne({ _id: req.fields.id });
      if (req.fields.name !== car.name) {
        car.name = req.fields.name;
      }
      if (req.fields.available !== car.available) {
        car.available = req.fields.available;
      }
      if (req.fields.station_id !== car.station_id) {
        // TO DO
        const carStation = Station.findById(req.fields.station_id);
        if (carStation) {
          car.station = carStation;
        } else {
          res.status(400).json({ message: "Station not found" });
        }
      }
      await car.save();
      res.status(200).json(car);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// TODO
// Delete car
router.delete("/car/delete", async (req, res) => {
  try {
    if (req.fields.id) {
      const car = await Car.findById(req.fields.id);
      const station = await Station.findById(car.station);
      station.update({ cars: cars.splice(station.cars.indexOf(car.id), 1) });
      await car.deleteOne();
      res.status(200).json({ message: "Car removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
