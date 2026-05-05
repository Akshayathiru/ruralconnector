const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: String, required: true },
  distanceValue: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  doctorsCount: { type: String, default: "0" },
  insurance: { type: String, default: "None" },
  symptoms: [String],
  ages: [String],
  image: { type: String, default: "🏥" },
  isOpen: { type: Boolean, default: true },
  emergencyActive: { type: Boolean, default: true },
  announcement: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
