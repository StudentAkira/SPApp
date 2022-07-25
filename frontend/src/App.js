import React, { useState } from 'react'
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

function App() {

        const dispatch = useDispatch()
        const auth = useSelector(state => state.auth)
        const [token, setToken] = useState('')
        const cookies = new Cookies();

        return (
            <BrowserRouter>
                <Link to='login'>Login</Link>
                <Link to='registrate'>Registrate</Link>
                <Link to='users'>Users</Link>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registrate' element={<Registrate/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='users/:uid' element={<User/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
