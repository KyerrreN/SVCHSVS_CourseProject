const Router = require("express");
const router = new Router();
const clientController = require("../controllers/clientController");

// GET
router.get("/:id", clientController.getClient);

// PUT
router.put("/:bidId", clientController.decideCompletion);

module.exports = router;
