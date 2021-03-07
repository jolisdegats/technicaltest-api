const mongoose = require("mongoose");

const Car = mongoose.model("Car", {
  name: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length > 3;
      },
      message: `Name must be longer than 3 characters`,
    },
    required: [true, "Name required"],
  },
  available: {
    type: Boolean,
    required: true,
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
  },
});

module.exports = Car;
