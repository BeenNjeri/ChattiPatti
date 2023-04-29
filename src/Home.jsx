import React from 'react'
import Chat from './Chat'
import Input from './Input'
import Sidebar from './Sidebar'


const Home = () => {
    return (
        <div className="home">
            <div className='container'>
                <Sidebar/>
                <Chat />
            </div>
        </div>

    )
}

export default Home