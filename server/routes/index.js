const Router = require("express");
const router = new Router();
const freelancerRouter = require("./freelancerRouter");
const bidRouter = require("./bidRouter");
const freelancerBidRouter = require("./freelanceBidRouter");

// This must be defined before other general routes
router.use("/freelancers/bids", freelancerBidRouter);
router.use("/freelancers", freelancerRouter);
router.use("/bids", bidRouter);

module.exports = router;
