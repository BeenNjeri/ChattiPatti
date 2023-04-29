import React from 'react'
import { useState } from 'react' 
import { db,storage } from "./Firebase"
import { doc,arrayUnion,updateDoc,serverTimestamp} from "firebase/firestore"
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { ChatContext } from "./ChatContext";
import { v4 as uuid } from "uuid";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {

    //function to capture on change event
    const [text, setTxt] = useState("");
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    

    const handleSend = async () => {
        
        console.log(currentUser.uid)
        const tid = uuid();


        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    // setErr = (true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatID), {
                            messages: arrayUnion({
                                id: tid,
                                text,
                                senderId: currentUser.uid,
                                date: Date.now(),
                            })
                        });
                    });
                })
                }
        else {

            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({ 
                    id: tid,
                    text,
                    senderId: currentUser.uid,
                    date: Date.now(),
                })
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID+".lastMessage"]: {
                text,
                "date": serverTimestamp()
            }
        });
        
        console.log(data)
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID + ".lastMessage"]: {
                text,
                "date": serverTimestamp()
            }
        });
        document.getElementById("txtin").value = "";
        setTxt("")
        setImg("")
    };




    return (
        <div className="input">
            <input className="inputTxt"  //value={messages}>
                placeholder="Type something" onChange={(e) => setTxt(e.target.value)} id="txtin"></input>

            <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} className="fileUpload"></input>
            <label className="attachIcon"htmlFor="file">
                <img src="https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-5/64/__image_upload_photo-512.png" />
            </label>
            <button onClick={handleSend} className="Send">send</button>
        </div>
    )
}

export default Input