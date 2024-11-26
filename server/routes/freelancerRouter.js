const Router = require("express");
const router = new Router();
const freelancerController = require("../controllers/freelancerController");

// 2) Получения всех записей с поддержкой пагинации
router.get("/", freelancerController.getAllPaging);
router.get("/filter", freelancerController.getAllFiltered);
router.post("/", freelancerController.create);

module.exports = router;
