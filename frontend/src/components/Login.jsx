import React, { useState } from 'react'


export const Login = () => {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        return (
        <div>
            <h3>Login : </h3>
            <input type="text" vlaue={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button>Login !</button>
            <hr/>
            LOGIN WITH : <br/>
            <a href='http://127.0.0.1:8000/login/vk-oauth2'>VK</a>
        </div>
    );
}
