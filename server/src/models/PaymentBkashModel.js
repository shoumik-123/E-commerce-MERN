const mongoose = require("mongoose");

const BkashSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    amount: {
        type: Number,
    },
    trxID: {
        type: String,
    },
    paymentID: {
        type: String,
    },
    date: {
        type: String,
    }
}, { timestamps: true })



const BkashModel = mongoose.model('bkash', BkashSchema)

module.exports = BkashModel;