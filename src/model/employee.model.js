const mongoose=require("mongoose")
const employeeSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        }
    },
    phone:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    department:{
        type:String
    }
})
module.exports = mongoose.model("Employee",employeeSchema)