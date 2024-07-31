// models/cars.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: String,
    isReadyToDrive: Boolean,
})

const Car = mongoose.model("Car", carSchema)

module.exports = Car