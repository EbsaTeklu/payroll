const mongoose=require("mongoose")
const ruleSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    range:{
        min:{
            type:Number
        },
        max:{
            type:Number
        },
    },
    tax:{
        type:Number
    },
})
module.exports=mongoose.model("Rule",ruleSchema)