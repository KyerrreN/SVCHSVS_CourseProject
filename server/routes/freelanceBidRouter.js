const Router = require("express");
const router = new Router();
const freelanceBidController = require("../controllers/freelanceBidController");

// GET
router.get("/client/:clientId", freelanceBidController.getAllClient);
router.get(
    "/freelancer/:freelancerId",
    freelanceBidController.getAllFreelancer
);

// PUT
router.put("/:freelid/:bidid", freelanceBidController.reportCompletion);

module.exports = router;
