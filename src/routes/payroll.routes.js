const express=require('express')
const mongoose=require('mongoose')
const Payroll=require('../model/payroll.model')
const Employee=require('../model/employee.model')
const Rule=require('../model/taxrule.model')
const router=express.Router()
router.get('/',(req,res)=>{
    Payroll.find()
    .populate("employee","name salary")
    .exec()
    .then(payrolls=>{
        return res.status(200).json({
            count:payrolls.length,
            payrolls:payrolls.map((payroll)=>{
                const totalIncome=payroll.employee.salary+payroll.allowance+payroll.overtime
                const totalDeduction=(payroll.employee.salary*(payroll.pension/100))+payroll.penality
                return {
                    id:payroll._id,
                    empid:payroll.employee._id,
                    name:payroll.employee.name,
                    salary:payroll.employee.salary,
                    allowance:payroll.allowance,
                    overtime:payroll.overtime,
                    totalIncome:totalIncome,
                    pension:payroll.pension,
                    penality:payroll.penality,
                    totalDeduction:totalDeduction,
                    netSalary:totalIncome-totalDeduction
                }
            })
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
    Payroll.findById(id)
    // .select("employee allowance")
    .populate("employee","name salary")
    .exec()
    .then(payroll=>{
        if (!payroll) {
            return res.status(404).json({
                message:"Payroll not found!"
            })
        }
        const totalIncome=payroll.employee.salary+payroll.allowance+payroll.overtime
        const totalDeduction=(payroll.employee.salary*(payroll.pension/100))+payroll.penality
        return res.status(200).json({
                    id:payroll._id,
                    empid:payroll.employee._id,
                    name:payroll.employee.name,
                    salary:payroll.employee.salary,
                    allowance:payroll.allowance,
                    overtime:payroll.overtime,
                    totalIncome:totalIncome,
                    pension:payroll.pension,
                    penality:payroll.penality,
                    totalDeduction:totalDeduction,
                    netSalary:totalIncome-totalDeduction
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })

})
router.post('/',(req,res)=>{
    const empId=req.body.employee
    Employee.findById(empId)
    .exec()
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
            pension:req.body.pension,
            penality:req.body.penality
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