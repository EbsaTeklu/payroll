// const express=require("express")
const mongoose=require("mongoose")
// const app=express()
const appCreater=require("./app")
const app=appCreater.createApp();

const start= () =>{
    mongoose.connect(`mongodb+srv://ebsaAdmin:${process.env.PASSWORD}@cluster0.f3voe1d.mongodb.net/?retryWrites=true&w=majority`,()=>{
        console.log("connected to mongodb")
    })
    try {
        app.listen(process.env.PORT,()=>{
            console.log(`listning at port ${process.env.PORT}`)
        })
    } catch (e) {
        console.error(e);
    }
}
module.exports= { start } 