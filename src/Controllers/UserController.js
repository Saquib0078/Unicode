const User = require('../Models/UserModel');
const generateOTP = require('../Utils/generateOtp');
const jwt=require('jsonwebtoken')

const userSignUp = async (req, res) => {
  const { name, mobile, email } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ error: 'Mobile number already registered' });
    }

    // Generate OTP and expiry time
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const newUser = new User({ name, mobile, email, otp, otpExpiry });
    await newUser.save();

    // await sendOTP(mobile, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Signup API error:', err);
    res.status(500).json({ error: err.message  });
  }
};

const verifyOtpSignup = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user.otp)

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ error: err.message  });
  }
};

// User Login
const userLogin = async (req, res) => {
  const { mobile } = req.body;

  try {
    // Find the user by mobile number
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate OTP and expiry time
    const otp = generateOTP();
    console.log(otp)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via SMS
    // await sendOTP(mobile, otp);

    res.status(200).json({ message: 'OTP sent successfully' ,otp:otp});
  } catch (err) {
    console.error('Login API error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP for Login
const verifyOtpLogin = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    // Find the user by mobile number
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the OTP is valid and not expired
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET, { expiresIn: '20d' }); 
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Login successful' ,token:token});
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  userSignUp,
  verifyOtpSignup,
  userLogin,
  verifyOtpLogin,
};

