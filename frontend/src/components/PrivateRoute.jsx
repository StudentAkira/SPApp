import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Users} from './Users'
import {Navigate, Route} from "react-router-dom";

export const PrivateRoute = ({children}) => {

        const auth = useSelector(state => state.auth)
        if(!auth.isAuthenticated){
            return (<Navigate to='/login'/>)
        }
        return children
    }
