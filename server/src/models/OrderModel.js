const mongoose= require('mongoose')
const DataSchema = mongoose.Schema({
    UserId :{type:String,unique:true},
    Status :{type:String},
    TotalAmount :{type:String},
    OrderDate:{type:Date , default:Date.now()}
},{versionKey:false})


const OrdersModel = mongoose.model('orders', DataSchema)

module.exports