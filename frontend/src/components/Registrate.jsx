import React, { useState } from 'react'


export const Registrate = () => {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')

        return (
        <div>
            <h3>Rigistrate : </h3>
            <input type="text" vlaue={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button>Registrate !</button><br/>
        </div>
    );
}
