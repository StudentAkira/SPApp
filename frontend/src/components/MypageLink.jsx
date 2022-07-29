import React, { useState } from 'react'
import {Login} from './Login'
import {Registrate} from './Registrate'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export const MypageLink = (props) => {

    const auth = useSelector(state => state.auth)
    if(auth.isAuthenticated){
        return (
            <div>
                <Link to='me'>Mypage</Link>
                <Link to='logout'>Logout</Link>
            </div>
        );
    }else{
        return (
            <div>
                <Link to='login'>Login</Link>
                <Link to='registrate'>Registrate</Link>
            </div>
        );
    }
}
