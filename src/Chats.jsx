import React from 'react'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from './Firebase';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ChatContext } from "./ChatContext";

const Chats = () => {
    
    const [chats, setChats] = useState([]);
    const { dispatch } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);



    useEffect(() => {
        console.log(currentUser)
        const getChats = () => {
            try { 
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
               !!doc.data && setChats(doc.data());
            });
            return () => {
                unsub();
            };
            } catch(err) {

        }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid]);
    
    

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
        console.log(u)
    }

    return (
        <div className="chats">     
            {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) =>
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1])}>

                    <div className="userChatInfo">
                        <img src={chat[1].photoURL} alt="" />

                        <span>{chat[1].displayName}
                            <p>{chat[1].lastMessage?.text}</p>
                        </span>
                    </div>
                </div>
            )
            }

        </div>
    );
}

export default Chats