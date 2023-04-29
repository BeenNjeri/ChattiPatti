import React from 'react'

const MessageSent = (m) => {
    return (
        <div className="message owner">
            <div className='messageInfo'>
                <img src="https://womenofrubies.com/wp-content/uploads/2019/11/27140073_1830016397039943_339453009_o-1024x1024.jpg" />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{m.text}</p>
            </div>
        </div>
    )
}

export default MessageSent