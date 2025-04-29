const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config");
const logger = require("./utils/logger");
const productsRoutes = require("./routing/products");  // products.js rotasını doğru ekledik
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");
const { STATUS_CODE } = require("./constants/statusCode");
const { MENU_LINKS } = require("./constants/navigation");
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");

const app = express();

// EJS'yi view engine olarak ayarladık
app.set("view engine", "ejs");
app.set("views", "views");

// Statik dosyaları kullanmaya başladık
app.use(express.static(getFileFromAbsolutePath("public")));

// URL parametrelerini body'ye alıyoruz
app.use(bodyParser.urlencoded({ extended: false }));

// Genel loglama
app.use((request, _response, next) => {
  const { url, method } = request;
  logger.getInfoLog(url, method); // Loglama işlemi
  next();
});

// Routing işlemleri
app.use("/products", productsRoutes);  // Ürünlerle ilgili yönlendirme
app.use("/logout", logoutRoutes);  // Çıkış işlemi
app.use("/kill", killRoutes);  // Server'ı kapatma işlemi
app.use(homeRoutes);  // Ana sayfa yönlendirmesi

// 404 sayfası: Eğer yukarıdaki rotalarda bir eşleşme olmazsa, 404 hatası döneriz
app.use((request, response) => {
  const { url } = request;
  response.status(STATUS_CODE.NOT_FOUND).render("404", {
    headTitle: "404",
    menuLinks: MENU_LINKS,
    activeLinkPath: "",
  });
  logger.getErrorLog(url);
});

// Server'ı başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
