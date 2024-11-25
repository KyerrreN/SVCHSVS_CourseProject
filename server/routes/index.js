const Router = require("express");
const router = new Router();
const freelancerRouter = require("./freelancerRouter");

router.use("/freelancers", freelancerRouter);

module.exports = router;
