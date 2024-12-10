const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authenticationController");

router.post("/freelancer", authenticationController.registerFreelancer);

module.exports = router;
