const mongoose=require("mongoose")
const PayrollSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:[true,"employee id is required"]
    },
    allowance:{
        type:Number,
        default:0
    },
    overtime:{
        type:Number,
        default:0
    },
    pension:{
        type:Number,
        default:7
    },
    penality:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model("Payroll",PayrollSchema)