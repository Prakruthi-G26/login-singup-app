import React, {useState} from "react";
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";
import './Login.css';


function Login() {
    const history = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try{
            await axios.post("http://localhost:3000/", {
                email, password
            })
            .then(res=>{
                if(res.data==="exist"){
                    history('/home',{state:{id:email}})
                }
                else if (res.data === "wrongpassword") {
                    alert("Incorrect password. Please enter correct details.");
                }
                else if(res.data==="notexist"){
                    alert("user have not registered")
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
        <div className="login">
            <h1>Login</h1>
            <form className="content" action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
                <input type="submit" onClick={submit}></input>
            </form>
            <p>Don't have an account?</p>
            <Link to='/signup'>Sign Up</Link>
        </div>
    );
}

export default Login;