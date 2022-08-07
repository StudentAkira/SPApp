import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Login = () => {

        function Logout(){
            const cookies = new Cookies();
            cookies.set('token', ' ', {maxAge:'-100000000', domain:'127.0.0.1', path:'/'})
            cookies.set('userId', ' ', {maxAge:'-100000000', domain:'127.0.0.1', path:'/'})
            cookies.set('csrftoken', ' ', {maxAge:'-100000000', domain:'127.0.0.1', path:'/'})
            cookies.set('sessionid', ' ', {maxAge:'-100000000', domain:'127.0.0.1', path:'/'})
            cookies.set('token', ' ', {maxAge:'-100000000', domain:'localhost', path:'/'})
            cookies.set('userId', ' ', {maxAge:'-100000000', domain:'localhost', path:'/'})
            cookies.set('csrftoken', ' ', {maxAge:'-100000000', domain:'localhost', path:'/'})
            cookies.set('sessionid', ' ', {maxAge:'-100000000', domain:'localhost', path:'/'})

            window.location.href = 'http://127.0.0.1:8000/login/vk-oauth2';

        }

        return (
            <button onClick={Logout}></button>
        );
    }
