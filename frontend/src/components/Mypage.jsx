import React, { useState, useEffect } from 'react'
import {useParams, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Mypage = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [avatar, setAvatar] = useState()
    const cookies = new Cookies();

    useEffect(()=>{
        async function getUserData(){
            const userData = await  axios.get(
                'http://127.0.0.1:8000/user/'+auth.userId+'/',
                {
                    headers:{
                        'Content-type':'application/json',
                        'Authorization': 'Token '+auth.token
                    }
                }
            )
            setData(userData)
            setLoading(false)
        }
        getUserData()
    },[])

    function Logout(){
        dispatch({type:'SET_TOKEN', payload:undefined})
        dispatch({type:'SET_AUTH', payload:false})
        dispatch({type:'SET_ID', payload:-1})
        cookies.remove('token')
        cookies.remove('userId')
        document.location.href = 'login'
    }

    function Upload(){
        let formData = new FormData();
        formData.append('avatar', avatar);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/test/',
          data: formData,
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Token '+auth.token
          }
        })
    }


    if(loading){
        return <h1>LOADING</h1>
    }else{
        let avatar_url = 'http://127.0.0.1:8000/media/'+data.data.avatar
        return (
            <div style={{display:'flex', marginTop:'20px'}}>
                <img src={avatar_url} alt="" style={{width:'10%'}}/>
                <div style={{fontSize:'25px', marginLeft:'20px'}}>{data.data.username}</div>
                <button onClick={()=>{Upload()}}>Change Avatar</button>
                <input type="file" onChange={(e)=>{setAvatar(e.target.files[0])}}/>
                <a onClick={()=>{Logout()}}>Logout</a>
            </div>
        );
    }
}
