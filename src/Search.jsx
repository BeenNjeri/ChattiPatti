import React, { useContext, useState } from 'react'
import {collection,query,where ,getDocs,getDoc,updateDoc,serverTimestamp, setDoc,doc} from "firebase/firestore"
import {db} from "./Firebase" 
import { AuthContext } from './AuthContext'


const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
            setErr(false)
        } catch (err) {
            setErr(true)
        }
    };
    const handleKey = (e) => {
       e.code == "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedID =
            currentUser.uid > user.uid ?
                currentUser.uid + user.uid :
                user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedID));
            //checking to see if it exists

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedID), { messages: [] });
                //query to fine user chatUsername
                //add sub collection to with combined id {data name }
                console.log("here")
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        messageid: combinedID,
                        "Date": serverTimestamp()
                    }
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedID]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        messageid: combinedID,
                        "Date": serverTimestamp()
                    }
                })
                

                console.log("Added")

            }
        } catch (err) {
            console.log("error occurred while writing to this damn databse")
        }
        setUser(null)
        setUsername("")
    }
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text"  placeholder="find a user" onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username } />
            </div>
            {err && <span>User Not Found</span>}
            {user && < div className="userChat" id="searchresult"  onClick={handleSelect }>

                <div className="userChatInfo">
                    <img src={user.photoURL}></img>
                    <span>{user.displayName}</span>
                </div>
            </div>}
         </div>
    )
}

export default Search