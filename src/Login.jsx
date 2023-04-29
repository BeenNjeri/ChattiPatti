import React, { useState } from 'react'
import Register from './Register'
import { useNavigate , Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import {auth}  from './Firebase'


const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        e.preventDefault()


        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")

        }catch (err) {
            setErr(true);
        }
    };

    return (
        < div className="formContainer" >
            <div className="formWrapper">

            <div className="Login">
                <div className="logo">SupaChat</div>
                <div className="title">#1 rated chat engine</div>

                    <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"></input>
                        <input type='password' placeholder="password"></input>
                        <button > Login</button>
                    </form>
                    <p> Don't have an account ? <Link to="/Register"> Sign Up</Link> </p>
                    {err && <span>Something went wrong</span>}

                </div>
            </div>
        </div>
    )
}

export default Login;
