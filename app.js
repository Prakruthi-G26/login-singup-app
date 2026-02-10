const express = require("express");
const collection = require('./mongo')
const cors = require("cors")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/", cors(), (req,res)=>{ })

app.post("/",async(req,res)=>{
    const{email, password} = req.body

    try{
        const check = await collection.findOne({email})

        if (!check) {
            return res.json({ status: "notexist" });
        }

        const isMatch = await bcrypt.compare(password, check.password);
        if (!isMatch) return res.json({ status: "wrongpassword" });
        const token = jwt.sign({ id: check._id, email: check.email }, "your-secret-jwt-key", { expiresIn: "1d" });
        res.json({ status: "exist", token });
    }
    catch(e){
        res.json({status:"notexist"})
    }
})

app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check = await collection.findOne({email:email})
        if(check){
            res.json({status:"exist"})
        }
        else{
            const minLength = 8;
            const hasUpperCase = /[A-Z]/;
            const hasLowerCase = /[a-z]/;
            const hasNumber = /[0-9]/;
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

            if (password.length < minLength || !hasUpperCase.test(password) || !hasLowerCase.test(password) || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
                return res.json({status:"passwordconstraints"})
            }
            res.json({status:"notexist"})
            const hashedPassword = await bcrypt.hash(password, 10);
            await collection.create({ email, password: hashedPassword });
        }
    }
    catch(e){
        console.log(e)
        res.json({status:"notexist"})
    }
    
})

app.listen(3000, ()=>{
    console.log("Port connected");
})