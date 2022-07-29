import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Mypage} from './components/Mypage'
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

        const [test, setTest] = useState(0)

        async function getAuth(token){
            if(!token){
                dispatch({type:'SET_LOADING', payload:false})
                return
            }
            const get = await axios.get(
                'http://127.0.0.1:8000/me',
                {
                        headers:
                        {
                            'Content-Type':'application/json',
                            'Authorization': 'Token '+token
                        }
                }
        )
            dispatch({type:'SET_LOADING', payload:false})
            dispatch({type:'SET_ID', payload:get.data.userId})
            if (get.data.userId!=-1){
                dispatch({type:'SET_AUTH', payload:true})
            }
        }
        if (auth.isLoading){
            getAuth(auth.token)
            return <h1>LOADING</h1>
        }else{
            return (
                <BrowserRouter>
                    <Mypage isAuth={auth.isAuthenticated}/>
                    <Link to='users'>Users</Link>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/registrate' element={<Registrate/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='users/user/:uid' element={<User/>}/>
                    </Routes>
                </BrowserRouter>
        );
    }
}

export default App;
