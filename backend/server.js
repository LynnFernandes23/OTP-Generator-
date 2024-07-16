const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const OTP = require('./models/otp');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/otpdb', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.post('/generate-otp', async (req, res) => {
  const { mobileNumber } = req.body;

  const otp = generateOTP(6);
  const otpInstance = new OTP({ mobileNumber, otp });
  await otpInstance.save();

  res.json({ otp });
});

app.post('/verify-otp', async (req, res) => {
  const { mobileNumber, otp } = req.body;

  const otpInstance = await OTP.findOne({ mobileNumber, otp });
  if (otpInstance) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

function generateOTP(length) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
