const express = require("express");
const router = express.Router();

const Station = require("../models/Station");

// Create station
router.put("/station/create", async (req, res) => {
  try {
    const newstation = new Station({
      name: req.fields.name,
    });
    await newstation.save();
    res.status(200).json({ message: "Station created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all stations
router.get("/stations", async (req, res) => {
  try {
    const stationsList = await Station.find();
    res.status(200).json(stationsList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read one station by id
router.get("/station/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update station
router.post("/station", async (req, res) => {
  try {
    if (req.fields.id && req.fields.name) {
      const station = await Station.findOne({ _id: req.fields.id });
      station.name = req.fields.name;
      await station.save();
      res.status(200).json(station);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete station
router.delete("/station/delete", async (req, res) => {
  try {
    if (req.fields.id) {
      const station = await Station.findById(req.fields.id);
      station.cars.map(async (car) => {
        car.update({ station: null });
      });
      await station.deleteOne();
      res.json({ message: "station removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
