const ProductModel = require("../models/ProductModel")
const UsersModel = require("../models/UsersModel")
const ApiFeatures = require("../utility/apiFeature");


//create ProductCard -- Admin
exports.createProduct = async (req,res,next)=>{
    try {
        let reqBody = req.body;
        const product = await ProductModel.create(reqBody)
        if(product){
            res.status(200).json({status:"success" , data:product})
        }
        else {
            res.status(400).json({status:"fail" , data:"error"})
        }
    }
    catch (e){
        console.log(e)
    }


}
//get all products
exports.getAllProducts =async (req,res)=>{
    try {
        const resultPerPage = 8
        const productsCount = await ProductModel.countDocuments()
        const pageCount = Math.ceil(productsCount / resultPerPage);
        const apiFeatures =new ApiFeatures(ProductModel.find(),req.query)
            .search()
            .filter()
            .pagination(resultPerPage)

        const products = await apiFeatures.query;
        // const filteredProductCount = products.length;
        // let products = await apiFeatures.query;
        // let filteredProductCount = products.length;
        // apiFeatures.pagination(resultPerPage)

        // await apiFeatures.query;
        if(products){
            res.status(200).json({
                status:"success",
                // filteredProductCount:filteredProductCount,
                pageCount:pageCount ,
                productCount:productsCount,
                resultPerPage:resultPerPage,
                // currentPage,
                data: products
            })
        }
        else {
            res.status(400).json({status:"fail" , data:"error"})
        }
    }
    catch (e){
        console.log(e)
    }

}
//get Products Details
exports.getProductDetails = async (req,res)=>{
    try{
        let id = req.params.id;
        let product = await ProductModel.findById(id)
        if(!product){
            return res.status(500).json({status:"fail",message:"ProductCard not found"})
        }
        else {
            res.status(200).json({status:"success" , data:product})
        }
    }
    catch (e){
        console.log(e)
    }
}
//Update product -- Admin
exports.updateProducts = async (req,res,next)=>{
    try{
        let id = req.params.id;
        let reqBody = req.body
        let product = await ProductModel.findById(id)
        if(!product){
            return res.status(500).json({status:"fail",message:"ProductCard not found"})
        }
        else {
            product = await ProductModel.findByIdAndUpdate(id,reqBody,{
                new:true,
                runValidators:true,
                useFindAndModify:false
            })

            console.log(product)

            res.status(200).json({status:"success" , data:product})
        }
    }
    catch (e){
        console.log(e)
    }
}
//Delete product -- Admin
exports.deleteProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ status: "fail", message: "ProductCard not found" });
        }

        // Use deleteOne or remove, both work
        await ProductModel.deleteOne({ _id: id });

        res.status(200).json({ status: "success", message: "Delete success" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
//Create review and update review
exports.createProductReview = async (req , res) =>{
    try{
        const email = req.headers['email']
        const {rating ,comment, productId} = req.body;
        const user = await UsersModel.findOne({ email: email });
        const review ={
            user : user._id,
            name : user.name,
            rating : Number(rating),
            comment,
        }
        const product = await ProductModel.findById(productId)

        const isReview = product.reviews.find(
            (rev)=> rev.user.toString() === user._id.toString()
        )
        if (isReview){
            product.reviews.forEach(rev=>{
                if(rev.user.toString() === user._id.toString()){
                    rev.rating=rating
                    rev.comment=comment
                }
            })
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }

        // Calculate the average rating
        let totalRating = 0;
        product.reviews.forEach((rev) => {
            totalRating += rev.rating;
        });
        product.ratings = totalRating / product.reviews.length;

        await product.save();   // Save the updated product

        res.status(201).json({ status: 'success', data: product });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
//Get All Reviews
exports.getAllReviews = async (req , res) =>{
    try{
        const product =await ProductModel.findById(req.query.id)

        if (!product){
            res.status(400).json({status:"fail" , message:"ProductCard Not Found"})
        }
        else {
            res.status(200).json({status: "success" , reviews : product.reviews})
        }
    }
    catch (e){
        console.log(e)
    }
}
//Delete review
exports.deleteReview = async (req , res)=>{
    try {
        const productId= req.query.productId
        const product =await ProductModel.findById(productId)
        if(!product){
            res.status(400).json({status:"fail" , message:"ProductCard Not Found"})
        }

        product.reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

        let totalRating = 0;
        product.reviews.forEach((rev) => {
            totalRating += rev.rating;
        });
        product.ratings = totalRating / product.reviews.length;

        product.numOfReviews = product.reviews.length;

        await ProductModel.findByIdAndUpdate(
            productId ,
            {
                reviews :product.reviews,
                ratings :product.ratings ,
                numOfReviews:product.numOfReviews
            },
            {
                new:true ,
                runValidators:true,
                useFindAndModify:false
            }
        )

        res.status(200).json({status:"success" , message :"Delete review success"})

    }
    catch (e){
        console.log(e)
    }
}