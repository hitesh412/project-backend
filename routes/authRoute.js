// const express = require('express');
// const { signupUser, loginUser, forgotPassword, resetPassword} = require('../controllers/authControllers');
// const router = express.Router();


// router.post('/signup', signupUser);

// router.post('/login', loginUser);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);





// module.exports = router;

const express = require("express");
const {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// ✅ PROFILE
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;

