import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db , storage } from "./Firebase";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom"



function Register() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password); 
            // Signed in
            console.log(res.user.displayName)
                const storageRef = ref(storage, displayName);

                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    (error) => {
                        setErr = (true);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "userChats", res.user.uid), { chat:[]});
                            console.log("okay");
                            navigate("/")

                        });
                    }
                );
            
            console.log("signed up " + res)

        } catch (err) {
            setErr(true);
        }
        };

    return (
        < div className="formContainer" >
        <div className="formWrapper">
            <div className="Register">
                <div className="logo">SupaChat</div>
                <div className="title">#1 rated chat engine</div>

                    <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="enter a username"></input>
                    <input type="email" placeholder="email"></input>
                    <input type='password' placeholder="password"></input>
                    <input type='file' className="profilePhoto"></input>
                    <label htmlFor="profilePhoto" >Upload a photo</label>
                        <button> Create your account</button>
                        {err && <span>Something went wrong</span> }
                </form>
                    <p> Already have an account ? <Link to="/Login"> Log in</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Register
