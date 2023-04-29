import React from 'react'
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatContext } from "./ChatContext";
import { useRef,ref,third }  from "react"

const Message =  ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const red = useRef()

    console.log(message)


    return (
        
        <div id="mes" className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            
            <div className='messageInfo'>
                <img src={message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                } />
            </div>
            <div className="messageContent">
                <p>{message?.text}</p>
                {message?.img && <img src={message.img} /> }
            </div>
        </div >
        

    )
}

export default Message 