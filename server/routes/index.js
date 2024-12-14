const Router = require("express");
const router = new Router();
const freelancerRouter = require("./freelancerRouter");
const bidRouter = require("./bidRouter");
const freelancerBidRouter = require("./freelanceBidRouter");
const authenticationRouter = require("./authenticationRouter");
const clientRouter = require("./clientRouter");
const bidOfferRouter = require("./bidOfferRouter");

// This must be defined before other general routes
router.use("/freelancers/bids", freelancerBidRouter);
router.use("/freelancers", freelancerRouter);
router.use("/bids", bidRouter);
router.use("/auth", authenticationRouter);
router.use("/clients", clientRouter);
router.use("/offers", bidOfferRouter);

module.exports = router;
