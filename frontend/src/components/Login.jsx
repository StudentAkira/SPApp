import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Login = () => {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)
        const cookies = new Cookies();


        async function Login(){
            const response = await  axios.get(
                'http://127.0.0.1:8000/getToken/',{
                    params:{
                        'username':username,
                        'password':password
                    }
                }
            )
            console.log(response)
            if (response.data.status == 'error'){
                alert(response.data.message)
            }
        }

        return (
        <div>
            <h3>Login : </h3>
            <input type="text" vlaue={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={Login}>Login !</button>
            <hr/>
            LOGIN WITH : <br/>
            <a href='http://127.0.0.1:8000/login/vk-oauth2'>VK</a>
        </div>
    );
}
