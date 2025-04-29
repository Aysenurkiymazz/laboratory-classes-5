class Cart {
    static items = [];
  
    static add(product, quantity) {
      const item = { product, quantity };
      this.items.push(item);
    }
  
    static getTotalPrice() {
      return this.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    }
  }
  
  module.exports = Cart;
  
  