const express=require('express')
const mongoose=require('mongoose')
const Payroll=require('../model/Payroll')
const Employee=require('../model/Employee')
const Rule=require('../model/Rule')
const router=express.Router()
router.get('/',(req,res)=>{
    Payroll.find()
    // .populate("Employee")
    .exec()
    .then(payrolls=>{
        return res.status(200).json({
            count:payrolls.length,
            payrolls:payrolls
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err,
            message:"INTERNAL SERVER ERROR!"
        })
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Payroll.findById(id).exec()
    .then(payroll=>{
        if (!payroll) {
            return res.status(404).json({
                message:"Payroll not found!"
            })
        }
        return res.status(200).json(payroll)
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })

})
router.post('/',(req,res)=>{
    const empId=req.body.employee
    Employee.findById(empId).exec()
    .then(employee=>{
        if (!employee) {
            return res.status(404).json({
                message:"Employee not found!"
            })
        }
        const payroll=new Payroll({
            _id:mongoose.Types.ObjectId(),
            employee:empId,
            allowance:req.body.allowance,
            overtime:req.body.overtime,
            totalIncome:req.body.totalIncome,
            totalDeduction:req.body.totalDeduction,
            incomeTax:req.body.incomeTax
        })
        payroll.save().then(payroll=>{
            return res.status(201).json(payroll)
        }).catch(err=>{
            return res.status(500).json({
                error:err
            })
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err,
            message:"Internal server error!"
        })    
    })
})
router.patch('/:id',(req,res)=>{
    const id=req.params.id
    Payroll.findByIdAndUpdate(id,{
        allowance:req.body.allowance,
        overtime:req.body.overtime,
        totalIncome:req.body.totalIncome,
        totalDeduction:req.body.totalDeduction
    }).exec()
    .then(payroll=>{
        if (!payroll) {
            return res.status(404).json({
                message:"Payroll not found!"
            })
        }
        return res.status(200).json({
            message:"Payroll updated!"
        })
    }).catch(err=>{
        return res.status(500).json({
            error:err
        })
    })

})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    Payroll.findByIdAndDelete(id).exec()
    .then(payroll=>{
        if (!payroll) {
            return res.status(404).json({
                message:"Payroll not found!"
            })
        }
        return res.status(200).json({
            error:"Payroll deleted!"
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
})
module.exports=router