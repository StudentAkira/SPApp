import React, { useState } from 'react'
import {Login} from './Login'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export const MypageLink = (props) => {

    const auth = useSelector(state => state.auth)
    if(auth.isAuthenticated){
        return (
            <div>
                <Link to='me'>Mypage</Link>
            </div>
        );
    }else{
        return (
            <div>
                <Link to='login'>Login</Link>
            </div>
        );
    }
}
