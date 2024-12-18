const Router = require("express");
const router = new Router();
const clientController = require("../controllers/clientController");

// PUT
router.put("/:bidId", clientController.decideCompletion);

// POST
router.post("/:clientId", clientController.postProject);

module.exports = router;
