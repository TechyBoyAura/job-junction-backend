const express = require("express");
const mongoose = require("mongoose");
const JobListing = require("./models/jobListing.js"); // Import the JobListing model
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));
// Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/jobjunction")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

const MONGO_URL = "mongodb://127.0.0.1:27017/jobjunction";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Route for rendering job listings with sector filter
app.get("/", async (req, res) => {
  const sector = req.query.sector || "IT"; // Default to IT if no sector is selected
  console.log(await JobListing.find({}));
  try {
    const jobs = await JobListing.find({ sector: sector });
    console.log("Jobs found:", jobs); // Add this to see what jobs are being found
    res.render("jobs.ejs", { jobs });
  } catch (err) {
    console.log("Error fetching jobs:", err);
  }
});

// Server
app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
