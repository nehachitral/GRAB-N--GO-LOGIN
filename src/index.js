// app.js

const express = require("express")
const app = express()
const path=require("path")
const hbs=require("hbs")
const templatePath=path.join(__dirname,'../template')
const collection=require("./mongodb")


app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))



app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>
{
    const data={
        name:req.body.name,
        password:req.body.password
        
    }
    await collection.insertMany([data])

    res.render("home")

})
app.post("/login",async (req,res)=>
{
    const name = req.body.name;
    const password=req.body.password;
    try{
        const check=await collection.findOne({
            name: name})
        if(check.password==req.body.password)
        {
            res.render("home")
        }
        else
        { 
        res.send("wrong password")
       }
}
    catch{
         res.send("wrong details")

    }

    res.render("home")

})

app.listen(3000,()=>{
    console.log("port connected");

})



