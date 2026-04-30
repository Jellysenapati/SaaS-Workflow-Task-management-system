const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware);
router.put("/profile", updateProfile);

module.exports = router;
