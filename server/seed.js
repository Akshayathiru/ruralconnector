const mongoose = require('mongoose');
const Hospital = require('./models/Hospital');
const Doctor = require('./models/Doctor');
const Admin = require('./models/Admin');
require('dotenv').config();

const hospitals = [
  {
    name: "City Care Hospital",
    distance: "3km",
    distanceValue: 3,
    location: "Chennai Central",
    rating: 4.8,
    doctorsCount: "85+",
    insurance: "Cashless",
    symptoms: ["Fever", "Cough", "General"],
    ages: ["0-4 yrs", "5-15 yrs", "16-18 yrs", "Above 18"],
    image: "🏥"
  },
  {
    name: "Rural Health Mission Clinic",
    distance: "2km",
    distanceValue: 2,
    location: "Village Center",
    rating: 4.3,
    doctorsCount: "12+",
    insurance: "Free/Govt",
    symptoms: ["Fever", "General", "First Aid"],
    ages: ["0-4 yrs", "5-15 yrs", "16-18 yrs", "Above 18"],
    image: "🚑"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected for seeding...');

    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    await Admin.deleteMany({});

    const createdHospitals = await Hospital.insertMany(hospitals);
    console.log('Hospitals seeded');

    // Create a default admin for the first hospital
    const admin = new Admin({
      username: 'admin',
      password: 'admin123',
      hospitalId: createdHospitals[0]._id
    });
    await admin.save();
    console.log('Default admin created: admin / admin123');

    // Seed some doctors for the first hospital
    const doctors = [
      { hospitalId: createdHospitals[0]._id, name: "Dr. Raj Kumar", specialty: "General Physician", tags: ["fever", "cough", "general"], available: true, experience: "15 yrs", rating: "4.9", time: "09:00 AM - 04:00 PM" },
      { hospitalId: createdHospitals[0]._id, name: "Dr. Anitha", specialty: "Cardiologist", tags: ["heart", "chest pain"], available: false, experience: "10 yrs", rating: "4.7", time: "Not available today" }
    ];
    await Doctor.insertMany(doctors);
    console.log('Doctors seeded');

    mongoose.connection.close();
    console.log('Seeding completed!');
  } catch (err) {
    console.error(err);
  }
};

seedDB();
