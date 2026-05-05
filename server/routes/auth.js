const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Hospital = require('../models/Hospital');

// Login Route
router.post('/login', async (req, res) => {
  const { username, password, hospitalId } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // If hospitalId is provided, ensure this admin is linked to it
    if (hospitalId && admin.hospitalId && admin.hospitalId.toString() !== hospitalId) {
      return res.status(403).json({ message: 'Unauthorized for this hospital' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, hospitalId: admin.hospitalId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const hospital = admin.hospitalId ? await Hospital.findById(admin.hospitalId) : null;

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        hospitalId: admin.hospitalId,
        hospitalName: hospital ? hospital.name : null
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register Initial Admin (Optional/Helper)
router.post('/register-initial', async (req, res) => {
  const { username, password, hospitalId } = req.body;
  try {
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const admin = new Admin({ username, password, hospitalId });
    await admin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
