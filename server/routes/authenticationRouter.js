const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authenticationController");

router.post("/freelancer", authenticationController.registerFreelancer);
router.post("/client", authenticationController.registrateClient);

module.exports = router;
