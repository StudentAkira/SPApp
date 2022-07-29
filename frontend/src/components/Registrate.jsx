import React, { useState } from 'react'
import axios from 'axios'

export const Registrate = () => {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        async function Registrate(){
            const response = await  axios.post(
                'http://127.0.0.1:8000/registrate/',
                {
                    data:{
                        'username': username,
                        'password': password,
                    }
                }
            )
            console.log(response)
        }

        return (
        <div>
            <h3>Rigistrate : </h3>
            <input type="text" vlaue={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={Registrate}>Registrate !</button><br/>
        </div>
    );
}
