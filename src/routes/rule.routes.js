const express=require("express")
const mongoose=require("mongoose")
const Rule=require("../model/taxrule.model")
const router=express.Router()
router.get('/',(req,res)=>{
    Rule.find().exec()
    .then(rules=>{
        return res.status(200).json({
            count:rules.length,
            rules:rules
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
})
router.get('/:id',(req,res)=>{
    const id= req.params.id
    Rule.findById(id).exec()
    .then(rule=>{
        if (!rule) {            
            return res.status(404).json({
                message:"Rule not found!"
            })
        }
        return res.status(200).json(rule)
    })
    .catch(err=>{
        return res.status(200).json({
            error:err
        })
    })
})
router.post('/',(req,res)=>{
    const rule=new Rule({
        _id:mongoose.Types.ObjectId(),
        tax:req.body.tax,
        range:{
            min:req.body.range.min,
            max:req.body.range.max
        }
    })
    rule.save()
    .then(rule=>{
        return res.status(201).json({
            message:"Rule created!",
            rule:rule
        })
    })
    .catch(err=>{
        return res.status(200).json({
            error:err
        })
    })
})
router.patch('/:id',(req,res)=>{
    const id= req.params.id
    Rule.findByIdAndUpdate(id,{
        tax:req.body.tax,
        range:{
            min:req.body.range.min,
            max:req.body.range.max
        }
    }).exec()
    .then(rule=>{
        if (!rule) {
            return res.status(404).json({
                message:"Rule not found!"
            })
        }
        return res.status(200).json({
            message:"Rule update!"
        })
    })
    .catch(err=>{
        return res.status(200).json({
            error:err
        })
    })
})
router.delete('/:id',(req,res)=>{
    const id= req.params.id
    Rule.findByIdAndDelete(id).exec()
    .then(rule=>{
        if (!rule) {
            return res.status(404).json({
                message:"Rule not found!"
            })
        }
        return res.status(200).json({
            message:"Rule Deleted!"
        }) 
    })
})
module.exports=router