import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import axios from 'axios'

export const User = (props) => {

        const [isloading, setLoading] = useState(true)
        const [data, setData] = useState({})

        const {uid} = useParams()

        useEffect(() => {
            axios.get(
                'http://127.0.0.1:8000/user/'+uid+'/',
            ).then((data) => {
                setData(data)
                setLoading(false)
            })
         }, []);

        if(isloading){
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
