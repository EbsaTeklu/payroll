const express=require("express")
const mongoose=require("mongoose")
const Employee=require("../model/employee")
const router=express.Router()
router.post('/',(req,res)=>{
    const employee=new Employee({
        _id:mongoose.Types.ObjectId(),
        name:{
            firstname:"ebsa",
            lastname:"teklu"
        },
        phone:"0930",
        salary:1000,
        department:"finance"
    })
    employee.save()
    .then(emp=>{
        return res.status(200).json({
            message:"created",
            employee:emp
        })
    })
    .catch(err=>{
        return res.status(500).json({
            message:"not created",
            error:err
        })    
    })
})
module.exports = router