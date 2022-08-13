const express=require("express")
const mongoose=require("mongoose")
const Employee=require("../model/Employee")
const router=express.Router()
router.get('/',(req,res)=>{
    Employee.find()
    .exec()
    .then(employees=>{
        return res.status(200).json({
            count:employees.length,
            employees:employees
        })
    })
    .catch(err=>{
        return res.status(500).json({
            message:"couldn't execute find",
            error:err
        })
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Employee.findById(id).exec()
    .then(emp=>{
        if (!emp) {
            return res.status(404).json({
                message:"employee with the specified id not found"
            })
        }
        return res.status(200).json(emp)
    })
    .catch(err=>{
        return res.status(500).json({
            message:"couldn't execute find",
            error:err
        })
    })
})
router.post('/',(req,res)=>{
    const employee=new Employee({
        _id:mongoose.Types.ObjectId(),
        name:{
            firstname:req.body.name.firstname,
            lastname:req.body.name.lastname
        },
        phone:req.body.phone,
        salary:req.body.salary,
        department:req.body.department
    })
    employee.save()
    .then(emp=>{
        return res.status(201).json({
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
router.patch("/:id",(req,res)=>{
    const id=req.params.id
    Employee.findByIdAndUpdate(id,{
        name:{
            firstname:req.body.name.firstname,
            lastname:req.body.name.lastname
        },
        phone:req.body.phone,
        salary:req.body.salary,
        department:req.body.department
    }).exec()
    .then(employee=>{
        if (!employee) {
            return res.status(404).json({
                message:"employee with the specified id not found"
            })
        }
        return res.status(200).json({
            message:"Employee Updated!",
            employee:employee
        })
    })
})
router.delete("/:id",(req,res)=>{
    const id=req.params.id
    Employee.findByIdAndDelete(id).exec()
    .then(employee=>{
        if (!employee) {
            return res.status(404).json({
                message:"Employee with id specified not found!"
            })
        }
        return res.status(200).json({
            message:"Employee is removed!"
        })
    })
    .catch(err=>{
        return res.status(500).json({
            message:"Internal error!",
            error:err
        })
    })
})
module.exports = router