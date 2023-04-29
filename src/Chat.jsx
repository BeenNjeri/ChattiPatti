import React, { useContext } from 'react'
import { ChatContext } from './ChatContext';
import Input from "./Input";
import Messages from "./Messages"

const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName} </span>
                <div className="chatIcons">
                    <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/profile-icon.png" />
                    <img src="https://yourdolphin.com/assets/upload/GuideConnect/Video_Calling.png" />
                    <img src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-13-512.png" />
                </div>
            </div>
            <Messages/>
            <Input />
        </div>

    )
}

export default Chat;