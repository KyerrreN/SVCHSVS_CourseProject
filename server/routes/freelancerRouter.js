const Router = require("express");
const router = new Router();
const freelancerController = require("../controllers/freelancerController");

// GET
router.get("/", freelancerController.getAllPaging);
router.get("/sort", freelancerController.getByRating);
router.get("/search", freelancerController.getSearchByName);
router.get("/filter", freelancerController.getFilterBySpec);
router.get("/:id", freelancerController.getById);

// PUT
router.put("/:id", freelancerController.updateProfile);

// DELETE
router.delete("/:id", freelancerController.delete);

module.exports = router;
