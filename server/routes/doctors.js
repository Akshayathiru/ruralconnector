const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors or filter by hospital
router.get('/', async (req, res) => {
  const { hospitalId } = req.query;
  try {
    const filter = hospitalId ? { hospitalId } : {};
    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update doctor availability
router.patch('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add new doctor
router.post('/', async (req, res) => {
  const doctor = new Doctor(req.body);
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
