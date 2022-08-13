const mongoose=require("mongoose")
const ruleSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    income:{
        type:Number
    },
    deduction:{
        type:Number,
        required:true
    },
})
module.exports=mongoose.model("Rule",ruleSchema)