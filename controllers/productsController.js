const Product = require('../models/Product');  // Product modelini doğru import ettik

// Ürün ekleme sayfası
exports.getAddProductView = (req, res) => {
  res.render('add-product', { headTitle: 'Add New Product' });
};

// Yeni ürün ekleme işlemi
exports.addNewProduct = (req, res) => {
  const { productName, description, price } = req.body;

  // "new" ile Product sınıfını başlatıyoruz
  const newProduct = new Product(productName, description, price);

  // Ürünü Product listesine ekliyoruz
  Product.add(newProduct);

  // Yeni ürünü ekledikten sonra, yeni ürün sayfasına yönlendiriyoruz
  res.status(200).redirect("/products/new");
};

// Yeni ürün sayfası
exports.getNewProductView = (req, res) => {
  const newestProduct = Product.getLast();  // Son eklenen ürünü alıyoruz
  res.render("new-product", {
    headTitle: "Newest Product",
    newestProduct: newestProduct,  // Yeni eklenen ürünü view'e gönderiyoruz
  });
};

