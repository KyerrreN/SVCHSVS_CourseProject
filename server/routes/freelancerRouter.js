const Router = require("express");
const router = new Router();
const freelancerController = require("../controllers/freelancerController");

// GET
router.get("/", freelancerController.getAllPaging);
router.get("/filter", freelancerController.getAllFiltered);
router.get("/sort", freelancerController.getAllSorted);

// POST
router.post("/", freelancerController.create);

module.exports = router;
