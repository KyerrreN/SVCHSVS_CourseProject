const Router = require("express");
const router = new Router();
const bidController = require("../controllers/bidController");

router.get("/freelancer/:id", bidController.getBidsBySpec);

module.exports = router;
