import React, { useState, useEffect } from 'react'
import {useParams, Navigate} from "react-router-dom";
import {useSelector } from 'react-redux'
import axios from 'axios'

export const Mypage = () => {

    const auth = useSelector(state => state.auth)
    const [isloading, setLoading] = useState(true)
    const [data, setData] = useState({})

    if(auth.userId == -1){
        return (
            <Navigate to='/registrate'/>
        )
    }

    async function getUserData(){
        const userData = await  axios.get(
            'http://127.0.0.1:8000/user/'+auth.userId+'/',
        )
        setLoading(false)
        setData(userData)
    }

    if(isloading){
        getUserData()
        return <h1>LOADING</h1>
    }else{
        let avatar_url = 'http://127.0.0.1:8000/media/'+data.data.avatar
        return (
        <div style={{display:'flex', marginTop:'20px'}}>
            <img src={avatar_url} alt="" style={{width:'10%'}}/>
            <div style={{fontSize:'25px', marginLeft:'20px'}}>{data.data.username}</div>

        </div>
        );
    }
}
