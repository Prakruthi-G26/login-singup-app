const express = require("express");
const collection = require('./mongo')
const cors = require("cors")

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/", cors(), (req,res)=>{ })

app.post("/",async(req,res)=>{
    const{email, password} = req.body

    try{
        const check = await collection.findOne({email:email})

        if (check) {
            if (check.password === password) {
                res.json("exist");
            } else {
                res.json("wrongpassword");
            }
        } else {
            res.json("notexist");
        }
    }
    catch(e){
        res.json("notexist")
    }
})

app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    

    try{
        const check = await collection.findOne({email:email})
        if(check){
            res.json("exist")
        }
        else{
            const minLength = 8;
            const hasUpperCase = /[A-Z]/;
            const hasLowerCase = /[a-z]/;
            const hasNumber = /[0-9]/;
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

            if (password.length < minLength || !hasUpperCase.test(password) || !hasLowerCase.test(password) || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
                return res.json("passwordconstraints")
            }
            const data={ email:email, password:password}
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(e){
        console.log(e)
        res.json("notexist")
    }
    
})

app.listen(3000, ()=>{
    console.log("Port connected");
})