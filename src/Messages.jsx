import React from 'react'
import Message from './Message'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from './Firebase';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ChatContext } from "./ChatContext";


const Messages = () => {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext);

    useEffect(() => {
        try {
            const unSub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
                doc.exists() && setMessages(doc.data()?.messages)
            })
            return () => {
                unSub();
            };
        } catch (err) { }

    }, [data.chatID]);


    console.log(messages)
    
    return (
        <div className="messages">
            {messages?.map((m) => (
                <Message message={m} key={m.id } />
            )
            )

            }

        </div>

    )
}

export default Messages