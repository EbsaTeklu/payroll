const express=require("express")
const morgan=require("morgan")
const bodyParser=require("body-parser")
const employees=require("./routes/employee.routes")
const rules=require("./routes/rule.routes")
const payrolles=require("./routes/payroll.routes")

function createApp() {
    const app=express()
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use('/employees',employees)
    app.use('/rules',rules)
    app.use('/payrolles',payrolles)
    app.get("/",(req,res)=>{
        res.status(200).json({
            message:"Payroll Rest API"
        })
    })
    return app
}
module.exports={createApp}