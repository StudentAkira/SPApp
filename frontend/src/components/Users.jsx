import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Login} from './Login'
import {User} from './User'
import {Loading} from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export const Users = () => {

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [pagenumber, setPagenumber] = useState(1)
    const [pagesize, setPagesize] = useState(20)
    const [totalcount, setTotalcount] = useState(pagesize)
    const [maxcount, setMaxcount] = useState(0)
    const [allusersloaded, setAllusersloaded] = useState(false)

    async function getUsers(){
        console.log('test1')
        const UsersData = await axios.get('http://127.0.0.1:8000/users/'+pagenumber,)
        UsersData.data.UsersData.map(user => {users.push(user)})
        setLoading(false)
        console.log(users)
    }

    useEffect(()=>{
        async function getUsers(){
            const UsersData = await axios.get('http://127.0.0.1:8000/users/'+pagenumber,)
            UsersData.data.UsersData.map(user => {users.push(user)})
            if (UsersData.data.UsersData.length < pagesize){
                setAllusersloaded(true)
                setLoading(false)
                return
            }
            setLoading(false)
            setPagenumber(pagenumber+1)
            setTotalcount(totalcount+UsersData.data.UsersData.length)
            setMaxcount(UsersData.data.AmountOfUsers)
        }
        if(loading){
            getUsers()
        }
    },[loading])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function(){
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    function scrollHandler (e){
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && !allusersloaded){
            setLoading(true)
            console.log(pagenumber)
        }
    }



    return (
        <div>
            <h1>{users.map((user, index) =>
            <Link to={'user/'+user[0].id} key={index+1}>{user[0].username}<br/></Link>
            )}</h1>
            <Loading visible={loading}/>
        </div>
    );

}
