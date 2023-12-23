const OrderModel = require("../models/OrderModel")
const UsersModel = require("../models/UsersModel")
const ProductModel = require("../models/ProductModel")

//Create New Order
exports.NewOrder = async (req,res)=>{
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const email = req.headers.email
        const user = await UsersModel.find({email: email},
            {name: 1,email: 1,_id: 1})

        const order = await OrderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: user[0],
        });

        if(order){
            res.status(200).json({status:"success" , data : order})
        }
        else {
            res.status(400).json({status:"fail" , data : "Order does not created"})
        }
    }
    catch (e){
        console.log(e)
    }

}

//get My order
exports.GetMyOrder = async (req,res)=>{
    try {
        const email = req.headers.email
        const users = await UsersModel.find({email: email},
            {name: 1,email: 1,_id:1})

        if (users.length > 0) {
            const user = users[0];
            const order = await OrderModel.find({ 'user._id': user._id });

            if(!order){
                res.status(400).json({status:"fail" , data : "order not found with this Id"})
            }
            else {
                res.status(200).json({status:"success" , data : order})
            }
        }
        else {
            res.status(400).json({status:"fail" , data : "user not found"})

        }

    }
    catch (e){
        console.log(e)
    }
}

//get single order
exports.GetSingleOrder = async (req,res)=>{
    try {
        const order = await OrderModel.findById(req.params.id)

        if(!order){
            res.status(400).json({status:"fail" , data : "Order not found with this Id"})
        }
        else {
            res.status(200).json({status:"success" , data : order})
        }
    }
    catch (e){
        console.log(e)
    }
}

//get all order  --> Admin
exports.GetAllOrder = async (req,res)=>{
    try {
        const order = await OrderModel.find()

        let totalAmount = 0
        order.forEach((order)=>{
            totalAmount += order.totalPrice
        })

        if(order){
            res.status(200).json({status:"success" , totalAmount:totalAmount , data : order })
        }
        else {
            res.status(400).json({status:"fail"})
        }
    }
    catch (e){
        console.log(e)
    }
}
//Update order by status -->Admin
exports.UpdateOrder = async (req,res)=>{
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        if(order.orderStatus === "Delivered"){
            res.status(400).json({message : "You have already delivered this order" })
        }

        // Update stock for each order item
        for (const orderItem of order.orderItems) {
            await updateStock(orderItem.product, orderItem.quantity);
        }


        order.orderStatus = req.body.status;    // Update order status and deliveredAt if needed

        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now()
        }

        await order.save({validateBeforeSave:false})

        res.status(200).json({ message: "Order updated successfully" ,data:order});
    }
    catch (e){
        console.log(e)
    }
}
async function updateStock(id, quantity){
    try {
        const product = await ProductModel.findById(id)

        if (!product) {
            console.log(`Product with ID ${id} not found`);
            return;
        }
        product.stock -= quantity;

        await product.save({validateBeforeSave:false})
    }
    catch (error) {
        console.log(`Error updating stock for product with ID ${id}: ${error}`);
    }

}
//delete order  --> Admin
exports.DeleteOrder = async (req,res)=>{
    try {
        const order = await OrderModel.findById(req.params.id)

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        await order.deleteOne()

        res.status(200).json({status:"success" , message:"Delete Successful"})
    }
    catch (e){
        console.log(e)
    }
}