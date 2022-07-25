import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Login} from './components/Login'
import {Registrate} from './components/Registrate'
import {Users} from './components/Users'
import {User} from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie';
import axios from 'axios'


function App() {

        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)
        const cookies = new Cookies();

        async function setAuth(token){
            if (!token){
                return
            }
            const getId = await axios.get(
                'http://127.0.0.1:8000/me',{
                    headers:{
                        Authorization: 'Token 5d3c2ec23d9c1fff3719c7dfafb11a38a87a08de',
                        'Content-Type': 'application/json',
                    }
                }
            )
            dispatch({type:'SET_ID', payload:getId.data.userId})
            dispatch({type:'SET_LOADING', payload:false})
        }

        useEffect(async () => {
              const data = await setAuth(auth.token);
         }, []);


        if (auth.isLoading){
            return <h1>LOADING</h1>
        }else{
            if(auth.userId){
                console.log('YEAH', auth.userId)
            }else{
                console.log('NOPE', auth.userId)
            }
            return (
                <BrowserRouter>
                    <Link to='login'>Login</Link>
                    <Link to='registrate'>Registrate</Link>
                    <Link to='users'>Users</Link>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/registrate' element={<Registrate/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='users/user:uid' element={<User/>}/>
                    </Routes>
                </BrowserRouter>
        );
    }
}

export default App;
