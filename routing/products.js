const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");  // Controller'ı doğru import ettik

// Ürün ekleme sayfası
router.get("/add", productsController.getAddProductView);  // Ürün ekleme sayfası için yönlendirme

// Ürün ekleme işlemi
router.post("/add", productsController.addNewProduct);  // Ürün ekleme işlemi için POST isteği

// Yeni ürün sayfası
router.get("/new", productsController.getNewProductView);  // Yeni eklenen ürünü gösteren sayfa

module.exports = router;

