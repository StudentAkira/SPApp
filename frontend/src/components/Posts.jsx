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

export const Posts = () => {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [pagenumber, setPagenumber] = useState(1)
    const [pagesize, setPagesize] = useState(20)
    const [totalcount, setTotalcount] = useState(pagesize)
    const [maxcount, setMaxcount] = useState(0)
    const [allpostsloaded, setAllpostsloaded] = useState(false)

    async function getPosts(){
        const PostsData = await axios.get('http://127.0.0.1:8000/posts/'+pagenumber,)
        PostsData.data.PostsData.map(post => {posts.push(post)})
        setLoading(false)
    }

    useEffect(()=>{
        async function getPosts(){
            const PostsData= await axios.get('http://127.0.0.1:8000/posts/'+pagenumber,)
            PostsData.data.PostsData.map(post => {posts.push(post)})
            if (PostsData.data.PostsData.length < pagesize){
                setAllpostsloaded(true)
                setLoading(false)
                return
            }
            setLoading(false)
            setPagenumber(pagenumber+1)
            setTotalcount(totalcount+PostsData.data.PostsData.length)
            setMaxcount(PostsData.data.AmountOfPosts)
        }
        if(loading){
            getPosts()
        }
    },[loading])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function(){
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    function scrollHandler (e){
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && !allpostsloaded){
            setLoading(true)
        }
    }



    return (
        <div>
            <h1>{posts.map((post, index) =>
            <Link to={'post/'+post[0].id} key={index+1}>{post[0].article}<br/></Link>
            )}</h1>
            <Loading visible={loading}/>
        </div>
    );

}
