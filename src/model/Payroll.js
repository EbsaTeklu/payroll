const mongoose=require("mongoose")
const PayrollSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    incomeTax:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rule",
        // required:true
    },
    allowance:{
        type:Number,
        default:0
    },
    overtime:{
        type:Number,
        default:0
    },
    totalIncome:{
        type:Number
    },
    totalDeduction:{
        type:Number
    },
    netSalary:{
        type:Number
    }
})
module.exports=mongoose.model("Payroll",PayrollSchema)