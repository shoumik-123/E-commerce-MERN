const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.ProcessPayment = async (req, res) => {
    try {
        console.log(req.body, "amount");
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            metadata: {
                company: "Happy Shopping"
            }
        });
        console.log("controller myPayment", myPayment);
        res.status(200).json({ status: "success", client_secret: myPayment.client_secret });
    } catch (e) {
        console.log("error :", e);
        res.status(500).json({ status: "error", message: "StripePayment processing failed" });
    }
};

exports.SendStripeApiKey= async (req,res)=>{
    try {
        res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY})
    }
    catch (e){
        console.log("error :",e)
    }
}