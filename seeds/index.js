const mongoose = require('mongoose');
const College = require('../models/college');
const cities = require('./cities');
const { places } = require('./names');

mongoose.connect('mongodb://localhost:27017/rate-my-college', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await College.deleteMany({});
  for (let i = 0; i < 150; i++) {
    const rand = Math.floor(Math.random() * 200);
    const ctc = 12;
    const camp = new College({
      author: '616fc6a7f2fd0deddd8e6633',
      location: `${cities[rand].city}, ${cities[rand].state}`,
      title: `${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Quam, debitis excepturi dignissimos quo, saepe beatae rerum aut similique esse nostrum mollitia maiores harum.Tempora tempore ipsa ipsam architecto asperiores vero.',
      ctc,
      geometry: {
        type: "Point",
        coordinates: [
          cities[rand].longitude,
          cities[rand].latitude,
        ]
      },
      images: [
        {
            url: 'https://res.cloudinary.com/nav0830/image/upload/v1634534015/Colleges/1_fa6bsl.png',
            filename: 'Colleges/1_fa6bsl'
        },
        {
            url: 'https://res.cloudinary.com/nav0830/image/upload/v1634534007/Colleges/download_hi4hbm.jpg',
            filename: 'Colleges/download_hi4hbm'
        }
    ]
    })
    await camp.save();
  }
}
seedDB().then(() => {
  mongoose.connection.close();
})
