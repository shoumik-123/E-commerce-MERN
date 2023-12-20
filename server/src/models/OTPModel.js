const mongoose= require('mongoose')
const OTPSchema = mongoose.Schema({
    Email :{type:String},
    Otp :{type:String},
    Status :{type:Number , default: 0},
    CreateDate:{type:Date , default:Date.now()}
},{versionKey:false})


const UOTPModel = mongoose.model('otps', OTPSchema)

module.exports = UOTPModel;