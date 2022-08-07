import React, { useState, useEffect } from 'react'
import {useParams, Navigate, Link} from "react-router-dom";
import {useSelector} from 'react-redux'
import {Mypage} from './Mypage'
import axios from 'axios'


export const Post = (props) => {

        const auth = useSelector(state => state.auth)
        const [isloading, setLoading] = useState(true)
        const [PostData, setPostData] = useState({})
        const [answer, setAnswer] = useState()
        const [redirect, setRedirect] = useState('')
        const [total_likes, setTotal_likes] = useState(false)
        const [displayLike, setDisplayLike] = useState('block')
        const [islike, setIslike] = useState(false)
        const [added, setAdded] = useState(false)

        var UserExists = true

        const {pid} = useParams()

        const headers = auth.token?{headers:
        {
            'Content-Type':'application/json',
            'Authorization': 'Token '+auth.token
        }}:null

        async function getPostData(){
            const PostData = await  axios.get(
                'http://127.0.0.1:8000/post/'+pid+'/',
                headers
            )
            setLoading(false)
            setPostData(PostData)
            setTotal_likes(PostData.data.PostData.likes)
            setIslike(PostData.data.isliked)
        }

        async function deletePost(){
            const response = await  axios.get(
                'http://127.0.0.1:8000/deletepost/'+pid+'/',
                {
                    headers:
                    {
                        'Content-Type':'application/json',
                        'Authorization': 'Token '+auth.token
                    }
                }
            )
            setAnswer(response.data.status)
            if(response.data.status != 'error'){
                setRedirect(response.data.redirect_to)
            }else{
                alert(response.data.message)
            }
        }

        async function Like(){
            setDisplayLike('none')
            setAdded(!added)
            const response = await  axios.get(
                'http://127.0.0.1:8000/like/'+pid+'/',
                {
                    headers:
                    {
                        'Content-Type':'application/json',
                        'Authorization': 'Token '+auth.token
                    }
                }
            )
            setDisplayLike('block')
        }

        if(isloading){
            getPostData()
            return <h1>LOADING</h1>
        }else{
            if(!PostData.data.OwnerData || answer == 'success'){
                return (
                    <Navigate to='/me'/>
                )
            }
            UserExists = PostData.data.OwnerData.exists
            let owner_id = UserExists?PostData.data.OwnerData.id:-1
            let avatar_url = UserExists?'http://127.0.0.1:8000/media/'+PostData.data.OwnerData.avatar:''
            let username = UserExists?PostData.data.OwnerData.username:''
            let rating = UserExists?PostData.data.OwnerData.rating:''
            let article = PostData.data.PostData.article
            let text = PostData.data.PostData.text
            let images = PostData.data.images
            let previous = 0
            let next = text.length
            return (
            <div style={{ marginTop:'20px'}}>
                <div
                 style={{display: UserExists?'flex':'none'}}
                >
                    <img src={avatar_url} alt="" style={{width:'100px', height:'100px', borderRadius:'100%'}}/>
                    <h2 style={{marginLeft:'30px'}}>
                        <Link to={'/users/user/'+owner_id}>{username} </Link>
                        rating : {rating}
                    </h2>
                </div>
                {auth.userId==owner_id?<Link to={'/editpost/'+PostData.data.PostData.id}>EditPost</Link>:null}
                {auth.userId==owner_id?<button onClick={deletePost}>DELETE POST</button>:null}
                {((auth.userId!=owner_id && auth.isAuthenticated) && (Boolean(auth.userId) && Boolean(auth.token)))?<button style={{display:displayLike}} onClick={Like}>Like</button>:null}
                <div>Likes : {

                    islike?added?total_likes-1:total_likes:added?total_likes+1:total_likes

                    }</div>
                <hr style={{display: UserExists?'auto':'none'}}/>
                <h2>{article?article:'No article'}</h2><br/>
                <div style={{width:'60%', margin:'auto', textAlign:'center', wordWrap: 'break-word'}}>
                    {images.map((image_item, index)=>{
                        let tmp = previous
                        next = image_item[1]
                        previous = next
                        return (
                            <div style={{margin:'auto', textAlign:'center'}}>
                                <p>
                                {text.slice(tmp, next)}
                                </p>
                                <img
                                    src={'http://127.0.0.1:8000/media/'+image_item[0]}
                                    style={{width:'10%'}}
                                    alt=""/>
                                <br/>
                            </div>
                        );
                    })}
                    <p>{text.slice(previous, text.length)}</p>
                </div>
            </div>
            );
        }

}
