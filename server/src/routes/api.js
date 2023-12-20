const express = require('express');
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const UsersController = require("../controllers/UserController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const authorizeRoles = require("../middleware/AuthRoles").authorizeRoles;

//User API
router.post("/registration" , UsersController.Registration);
router.post("/login",UsersController.UserLogin)
// router.post("/profileUpdate",AuthVerifyMiddleware ,UsersController.UpdateProfile)
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails)


//Product API
router.post("/product/new",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.createProduct)        //--Admin
router.get("/products",ProductController.getAllProducts)
router.get("/product/:id",ProductController.getProductDetails)
router.post("/updateProduct/:id",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.updateProducts)  //--Admin
router.post("/deleteProduct/:id",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.deleteProducts)   //--Admin

//
// //Recovery password
// router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail)
// router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP)
// router.post("/RecoverResetPassword",UsersController.RecoverResetPassword)
//



module.exports = router;