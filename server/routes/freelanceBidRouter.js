const Router = require("express");
const router = new Router();
const freelanceBidController = require("../controllers/freelanceBidController");

// GET
router.get("/client/:clientId", freelanceBidController.getAllClient);
router.get(
    "/freelancer/:freelancerId",
    freelanceBidController.getAllFreelancer
);

// POST
router.post("/", freelanceBidController.create);

// PUT
router.put("/:freelid/:bidid", freelanceBidController.reportCompletion);

// DELETE
router.delete("/:freelid/:bidid", freelanceBidController.delete);

module.exports = router;
