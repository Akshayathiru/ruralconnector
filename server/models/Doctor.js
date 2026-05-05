const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  tags: [String],
  available: { type: Boolean, default: true },
  experience: { type: String },
  rating: { type: String },
  time: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
