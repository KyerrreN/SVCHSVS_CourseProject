const Router = require("express");
const router = new Router();
const freelancerController = require("../controllers/freelancerController");

// GET
router.get("/", freelancerController.getAllPaging);
router.get("/filter", freelancerController.getAllFiltered);
router.get("/sort", freelancerController.getAllSorted);
router.get("/search", freelancerController.getAllSearch);
router.get("/:id", freelancerController.getById);
router.get("/isExist/:id", freelancerController.getIsExist);

// POST
router.post("/", freelancerController.create);

// PUT
router.put("/:id", freelancerController.put);

module.exports = router;
