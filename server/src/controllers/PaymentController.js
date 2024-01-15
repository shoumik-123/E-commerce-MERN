const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


exports.ProcessPayment= async (req,res)=>{
    try {
        const myPayment = await stripe.create({
            amount : req.body.amount,
            currency:"inr",
            metadata:{
                company:"Happy Shopping"
            }
        })
        res.status(200).json({status:"success", client_secret:myPayment.client_secret})
    }
    catch (e){
        console.log("error :",e)
    }
}
exports.SendStripeApiKey= async (req,res)=>{
    try {
        res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY})
    }
    catch (e){
        console.log("error :",e)
    }
}