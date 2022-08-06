import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {MypageLink} from './components/MypageLink'
import {Mypage} from './components/Mypage'
import {Login} from './components/Login'
import {Users} from './components/Users'
import {Posts} from './components/Posts'
import {User} from './components/User'
import {Post} from './components/Post'
import {PrivateRoute} from './components/PrivateRoute'
import {Postcreator} from './components/Postcreator'
import {Posteditor} from './components/Posteditor'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie';
import axios from 'axios'


function App() {

        const [loading, setLoading] = useState(true)
        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)
        const cookies = new Cookies();



        useEffect(()=>{
            async function getAuth(){
                let token = auth.token?auth.token:document.URL.split('token=')[1]
                if(!token){
                    return
                }
                if(auth.userId){
                    return
                }
                const response = await axios.get(
                    'http://127.0.0.1:8000/me',
                    {
                            headers:
                            {
                                'Content-Type':'application/json',
                                'Authorization': 'Token '+token
                            }
                    }
                )
                if (response.data.userId != -1){
                    dispatch({type:'SET_ID', payload:response.data.userId})
                    dispatch({type:'SET_AUTH', payload:true})
                    dispatch({type:'SET_TOKEN', payload:token})
                    cookies.set('token', token)
                    cookies.set('userId', response.data.userId)
                }
            }
            getAuth()
            setLoading(false)
        },[])

        if (loading){
            return <h1>LOADING</h1>
        }else{
            return (
                <BrowserRouter>
                    <MypageLink/>
                    <Link to='users'>Users</Link>
                    <Link to='posts'>Posts</Link>
                    <Routes>
                        <Route path='/me' element={
                            <PrivateRoute>
                                <Mypage/>
                            </PrivateRoute>
                        }/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/users/user/:uid' element={<User/>}/>
                        <Route path='/posts' element={<Posts/>}/>
                        <Route path='/posts/post/:pid' element={<Post/>}/>
                        <Route path='/newpost' element={
                            <PrivateRoute>
                                <Postcreator/>
                            </PrivateRoute>
                        }/>
                        <Route path='/editpost/:pid' element={
                            <PrivateRoute>
                                <Posteditor/>
                            </PrivateRoute>
                        }/>
                    </Routes>
                </BrowserRouter>
        );
    }
}

export default App;
