const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedsHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// creates seed data from cities and seedHelpers files
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: '6744cf1be5e48f310d5d99b4',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      description: "Beautiful Campground Might Be Haunted",
      price: 39.99,
      images: [
        {
          url: 'https://res.cloudinary.com/dt9gl4yjj/image/upload/v1741119381/YelpCamp/e8vl5etk6umfyqeqbdo4.jpg',
          filename: 'YelpCamp/e8vl5etk6umfyqeqbdo4',
        },
        {
          url: 'https://res.cloudinary.com/dt9gl4yjj/image/upload/v1741119381/YelpCamp/bsihxynsxkg9yomezgqx.jpg',
          filename: 'YelpCamp/bsihxynsxkg9yomezgqx',
        },
      ]
    });
    await camp.save();
  }
};
// seeds data then closes DB connection 
seedDB().then(() => {
  mongoose.connection.close();
});
