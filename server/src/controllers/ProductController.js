const ProductModel = require("../models/ProductModel")
const ApiFeatures = require("../utils/apiFeature");


//create Product -- Admin
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
        const resultPerPage = 5
        const productCount = await ProductModel.countDocuments()
        const apiFeatures =new ApiFeatures(ProductModel.find(),req.query)
            .search()
            .filter()
            .pagination(resultPerPage)
        const products = await apiFeatures.query;
        if(products){
            res.status(200).json({status:"success" ,productCount:productCount, data: products})
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
exports.getProductDetails = async (req,res,next)=>{
    try{
        let id = req.params.id;
        let product = await ProductModel.findById(id)
        if(!product){
            return res.status(500).json({status:"fail",message:"Product not found"})
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
            return res.status(500).json({status:"fail",message:"Product not found"})
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
            return res.status(404).json({ status: "fail", message: "Product not found" });
        }

        // Use deleteOne or remove, both work
        await ProductModel.deleteOne({ _id: id });

        res.status(200).json({ status: "success", message: "Delete success" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};