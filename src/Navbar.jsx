import React from 'react'
import Search from './Search';
import { signOut } from "firebase/auth"
import { auth } from "./Firebase"
import { AuthContext } from './AuthContext'
import { useContext } from 'react'


const Navbar = () => {

    const { currentUser } = useContext(AuthContext)


    return (
        <div className="navbar">
            <span className="logo">Chatty Patty</span>
            <div className="user">
                <img src={currentUser.photoURL}alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar;