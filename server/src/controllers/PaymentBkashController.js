const globals = require('node-global-storage')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')


bkash_headers = async () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: globals.get('id_token'),
        'x-app-key': process.env.BKASH_API_KEY,
    }
}


exports.PaymentCreate = async (req, res) => {
    const { amount, userId } = req.body;
    globals.set('userId', userId);

    try {
        const { data } = await axios.post(process.env.BKASH_CREATE_PAYMENT_URL, {
            mode: '0011',
            payerReference: " ",
            callbackURL: 'http://localhost:8000/api/v1/bkash/payment/create',
            amount: amount,
            currency: "BDT",
            intent: 'sale',
            merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5)
        }, {
            headers: await bkash_headers()
        });

        return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};