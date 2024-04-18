const express = require("express");
const router = express.Router();
const userController=require('../Controllers/UserController')
const destinationController=require('../Controllers/DestinationController')
const hotel=require('../Controllers/HotelController');

router.get('/test-me', function (req, res) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
    res.json('My First ever api!'+authToken)
});


router.post('/signupUser',userController.userSignUp)
router.post('/verify',userController.verifyOtpSignup)
router.post('/login',userController.userLogin)
router.post('/verifyLogin',userController.verifyOtpLogin)


router.get('/getdestinations',destinationController.getdestinations)

router.get('/hotels',hotel.getHotels)




module.exports = router;