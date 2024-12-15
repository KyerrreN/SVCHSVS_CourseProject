const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authenticationController");

router.post(
    "/register/freelancer",
    authenticationController.registerFreelancer
);
router.post("/register/client", authenticationController.registrateClient);
router.post("/login", authenticationController.login);
router.put("/changepassword", authenticationController.changePassword);
router.delete("/delete", authenticationController.deleteUser);

module.exports = router;
