const Router = require("express");
const router = new Router();
const freelancerRouter = require("./freelancerRouter");
const bidRouter = require("./bidRouter");

router.use("/freelancers", freelancerRouter);
router.use("/bids", bidRouter);

module.exports = router;
