const Router = require("express");
const router = new Router();
const bidController = require("../controllers/bidController");

// GET
router.get("/", bidController.getAllPaging);
router.get("/freelancer/:id", bidController.getBidsBySpec);
router.get("/filter", bidController.getAllFiltered);
router.get("/sort", bidController.getAllSorted);
router.get("/search", bidController.getAllSearch);
router.get("/:id", bidController.getById);
router.get("/isExist/:id", bidController.getIsExist);

// POST
router.post("/", bidController.create);

// PUT
router.put("/:id", bidController.put);

// DELETE
router.delete("/:id", bidController.delete);

module.exports = router;
