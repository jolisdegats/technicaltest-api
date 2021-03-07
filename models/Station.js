const mongoose = require("mongoose");

const Station = mongoose.model("Station", {
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
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

module.exports = Station;
