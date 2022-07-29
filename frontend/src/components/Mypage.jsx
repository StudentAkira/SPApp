import React, { useState } from 'react'
import {Login} from './Login'
import {Registrate} from './Registrate'
import { Link } from "react-router-dom";

export const Mypage = (props) => {


        console.log(props.isAuth)

        if (!props.isAuth){
            return (
                <div>
                    <Link to='login'>Login</Link>
                    <Link to='registrate'>Registrate</Link>
                </div>
        );
        }else{
            return (
                <div>
                    <Link to='me'>{}</Link>
                </div>
            );
        }
}
