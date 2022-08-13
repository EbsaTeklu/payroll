const express=require("express")
const mongoose=require("mongoose")
const morgan=require("morgan")
const bodyParser=require("body-parser")
const employees=require("./routes/employee")
const rules=require("./routes/Rule")
const payrolles=require("./routes/Payroll")
const app=express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect(`mongodb+srv://ebsaAdmin:${process.env.PASSWORD}@cluster0.f3voe1d.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log("connected to mongodb")
})
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Payroll Rest API"
    })
})
app.use('/employees',employees)
app.use('/rules',rules)
app.use('/payrolles',payrolles)
app.listen(process.env.PORT,()=>{
    console.log(`listning at port ${process.env.PORT}`)
})