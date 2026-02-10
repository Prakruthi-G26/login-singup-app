import React, {useState} from "react";
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";
import './Login.css';

function Signup() {
    const history = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try{
            await axios.post("http://localhost:3000/signup", {
                email, password
            })
            .then(res=>{
                if(res.data==="exist"){
                    alert("user already exists")
                }
                else if(res.data==="passwordconstraints"){
                    alert("Password must be at least 8 characters long and include atleast 1 uppercase, lowercase, number, and special character.")
                }
                else if(res.data==="notexist"){
                    history('/home',{state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e)
            })
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <div className="signup">
            <h1>SignUp</h1>
            <form className="content" action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
                <input type="submit" onClick={submit}></input>
            </form>
            <p>Already have an account?</p>
            <Link to = '/'>Login</Link>
        </div>
        
    )
}

export default Signup;