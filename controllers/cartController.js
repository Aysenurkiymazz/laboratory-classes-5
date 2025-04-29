const Cart = require('../models/cart');  // Cart modelini import ettik
const Product = require('../models/Product');  // Product modelini import ettik

// Sepete ürün ekleme işlemi
exports.addProductToCart = (req, res) => {
  const { productName, quantity } = req.body;  // Formdan gelen veriler
  const product = Product.findByName(productName);  // Ürünü buluyoruz

  if (product) {
    Cart.add(product, quantity);  // Ürünü sepete ekliyoruz
    res.status(200).send({
      message: `Product added to cart! Total Price: $${Cart.getTotalPrice()}`, // Sepete ekleme başarılı
    });
  } else {
    res.status(404).send('Product not found!');
  }
};

// Sepet görünümünü almak
exports.getCartView = (req, res) => {
  const cartItems = Cart.items;  // Sepetteki ürünler
  const totalPrice = Cart.getTotalPrice();  // Toplam fiyat

  res.render('cart', {
    headTitle: 'Shopping Cart',  // Sayfa başlığı
    cartItems: cartItems,  // Sepetteki ürünler
    totalPrice: totalPrice,  // Toplam fiyat
  });
};

