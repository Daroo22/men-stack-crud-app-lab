
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Car = require("./models/cars.js")
const methodOverride = require("method-override")
const morgan = require("morgan")

const app = express();

dotenv.config();


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev")) 







app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs")
});


app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId)
  res.render("cars/show.ejs", { car: foundCar})
}) 

//POST /cars

app.post("/cars", async (req, res) => {
  if (req.body.isReadyToDrive === "on") {
    req.body.isReadyToDrive = true;
  } else {
    req.body.isReadyToDrive = false;
  }
 await Car.create(req.body)
 res.redirect("/cars")

})

app.get("/cars", async (req, res) => {
  const allCars = await Car.find();
  res.render("./cars/index.ejs", { cars: allCars })
})

// Delete

app.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.redirect("/cars")
})
 
// Edit

app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId)
  res.render("cars/edit.ejs", {
    car: foundCar
  })
})

app.put("/cars/:carId", async (req, res) => {
  if (req.body.isReadyToDrive === "on"){
    req.body.isReadyToDrive = true
  } else {
    req.body.isReadyToDrive = false
  }
  const editCar = await Car.findByIdAndUpdate(req.params.carId, req.body)
  res.redirect("/cars")
   })



mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
  
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
