import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from "react-router-dom";
import { Cookies } from 'react-cookie';


export const Logout = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const cookies = new Cookies();

    dispatch({type:'SET_TOKEN', payload:undefined})
    dispatch({type:'SET_AUTH', payload:false})
    dispatch({type:'SET_ID', payload:-1})
    cookies.remove('token')
    return (
        <Navigate to='/'/>
    )
}
