const Router = require("express");
const router = new Router();
const bidHistoryController = require("../controllers/bidHistoryController");

// GET
router.get("/:freelancerId", bidHistoryController.getHistory);

module.exports = router;
