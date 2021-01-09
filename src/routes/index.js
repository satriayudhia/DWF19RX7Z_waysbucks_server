const express = require("express");
const router = express.Router();
const { uploadFile } = require("../middleware/upload");
const { auth: authentication } = require("../middleware/auth");

// ================= //
// CONTROLLER IMPORT //
// ================= //

//AUTHORIZATION
const { register, login, checkAuth } = require("../controllers/auth");

//USERS
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//PRODUCTS
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

//TOPINGS
const {
  getTopings,
  getToping,
  addToping,
  updateToping,
  deleteToping,
} = require("../controllers/toping");

//PRODUCT-TOPING
const {
  addProductToping,
  deleteProductToping,
} = require("../controllers/productToping");

//TRANSACTION
const {
  getTransactions,
  getTransaction,
  getTransactionUser,
  addTransaction,
  updateTransaction,
  updateTransactionStatus,
  deleteTransaction,
} = require("../controllers/transaction");

// ==== //
// PATH //
// ==== //

//AUTHORIZATION PATH
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authentication, checkAuth);

//USERS PATH
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", authentication, uploadFile("profpic"), updateUser);
router.delete("/user/:id", deleteUser);

//PRODUCTS PATH
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", authentication, uploadFile("photo"), addProduct);
router.patch(
  "/product-update/:id",
  authentication,
  uploadFile("photo"),
  updateProduct
);
router.delete("/product/:id", authentication, deleteProduct);
// router.post('/product/:id', restoreProduct)

// //TOPINGS PATH
router.get("/topings", getTopings);
router.get("/toping/:id", getToping);
router.post("/toping", authentication, uploadFile("photo"), addToping);
router.patch("/toping/:id", authentication, updateToping);
router.delete("/toping/:id", authentication, deleteToping);
// router.post('/toping/:id', restoreToping)

//PRODUCT-TOPING PATH
router.post("/product-toping", authentication, addProductToping);
router.delete(
  "/delete-product-toping/:idTransaction",
  authentication,
  deleteProductToping
);

//TRANSACTIONS PATH
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.get("/transaction-user/:idUser", getTransactionUser);
router.post("/transaction", addTransaction);
router.patch(
  "/transaction/:id",
  authentication,
  uploadFile("attachment"),
  updateTransaction
);
router.patch(
  "/transaction-status/:id",
  authentication,
  updateTransactionStatus
);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
