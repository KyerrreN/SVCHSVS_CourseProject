const Router = require("express");
const router = new Router();
const bidOfferController = require("../controllers/bidOfferController");

// POST
router.post("/", bidOfferController.createOffer);
router.post("/accept/:id", bidOfferController.acceptBidOffer);

router.get("/:clientId", bidOfferController.getBidOffers);

router.delete("/:id", bidOfferController.rejectOffer);

module.exports = router;
