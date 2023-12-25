const express = require('express');
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const UsersController = require("../controllers/UserController");
const OrderController = require("../controllers/OrderController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const authorizeRoles = require("../middleware/AuthRoles").authorizeRoles;


//User API
router.post("/registration" , UsersController.Registration);
router.post("/login",UsersController.UserLogin)
router.post("/profileUpdate",AuthVerifyMiddleware ,UsersController.UpdateProfile)
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails)
//For Admin
router.get("/admin/getAllUsers",AuthVerifyMiddleware,  authorizeRoles('admin'), UsersController.GetAllUsers)
router.get("/admin/getSingleUser/:id",AuthVerifyMiddleware,  authorizeRoles('admin'), UsersController.GetSingleUsers)
router.post("/admin/updateRole/:id",AuthVerifyMiddleware,  authorizeRoles('admin') ,UsersController.UpdateRole)
router.post("/admin/deleteUser/:id",AuthVerifyMiddleware,  authorizeRoles('admin') ,UsersController.DeleteUser)

//ProductCard API
router.post("/admin/product/new",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.createProduct)        //--Admin
router.get("/products",ProductController.getAllProducts)
router.get("/product/:id",ProductController.getProductDetails)
router.post("/admin/updateProduct/:id",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.updateProducts)  //--Admin
router.post("/admin/deleteProduct/:id",AuthVerifyMiddleware, authorizeRoles('admin'), ProductController.deleteProducts)   //--Admin
router.post("/review",AuthVerifyMiddleware, ProductController.createProductReview)
router.get("/reviews" , ProductController.getAllReviews)
router.post("/deleteReviews" , AuthVerifyMiddleware , ProductController.deleteReview)

//Order API
router.post("/newOrder", AuthVerifyMiddleware,OrderController.NewOrder)
router.get("/myOrder", AuthVerifyMiddleware,OrderController.GetMyOrder)
router.get("/order/:id", AuthVerifyMiddleware ,OrderController.GetSingleOrder)
router.get("/admin/order", AuthVerifyMiddleware , authorizeRoles('admin') ,OrderController.GetAllOrder)
router.post("/admin/order/:id", AuthVerifyMiddleware , authorizeRoles('admin') ,OrderController.UpdateOrder)
router.post("/admin/delete/:id", AuthVerifyMiddleware , authorizeRoles('admin') ,OrderController.DeleteOrder)


//Recovery password
router.get("/recoverVerifyEmail/:email",UsersController.RecoverVerifyEmail)
router.get("/recoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP)
router.post("/recoverResetPassword",UsersController.RecoverResetPassword)




module.exports = router;