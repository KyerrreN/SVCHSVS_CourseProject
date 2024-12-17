const Router = require("express");
const router = new Router();
const bidController = require("../controllers/bidController");

router.get("/freelancer/:id", bidController.getBidsBySpec);
router.get("/client/:clientId", bidController.getClientBids);

router.delete("/client/:bidId/:clientId", bidController.deleteBid);

module.exports = router;
