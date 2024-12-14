const Router = require("express");
const router = new Router();
const bidOfferController = require("../controllers/bidOfferController");

// POST
router.post("/", bidOfferController.createOffer);

module.exports = router;
