import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useParams, Navigate} from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Posteditor = () => {

    const auth = useSelector(state => state.auth)
    const [postdata, setPostData] = useState()
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([])
    const [newimages, setNewimages] = useState([])
    const [rerender, setRerender] = useState(true)
    const [article, setArticle] = useState('NO article')
    const [text, setText] = useState('')
    const [editedstatus, setEditedstatus] = useState('')
    const [redirect, setRedirect] = useState('')

    const {pid} = useParams()


    function upload(){
        let MainTexts = []
        let ImageOrderNumbers = []
        let ImagePositions = []
        let ImagePosition = 0
        for (var i = 0; i < (document.getElementsByClassName('userstext')).length-1; i++) {
            MainTexts += (document.getElementsByClassName('userstext'))[i].value
            ImagePosition += (document.getElementsByClassName('userstext'))[i].value.length
            ImagePositions.push(ImagePosition)
        }
        MainTexts += (document.getElementsByClassName('userstext'))[(document.getElementsByClassName('userstext')).length-1].value

        const formData = new FormData()

        formData.append('text', MainTexts)
        formData.append('article', article)
        formData.append('image_postitions', ImagePositions)
        for (var i = 0; i < newimages.length; i++){
            if(!newimages[i]){
                continue
            }
            ImageOrderNumbers.push(i)
            formData.append(i, newimages[i]);
        }
        formData.append('images_order_numbers', ImageOrderNumbers)

        async function sendPost(formData){
            setLoading(true)
            const response = await axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/editpost/'+pid+'/',
              data: formData,
              headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Token '+auth.token
              }
            })
            setEditedstatus(response.data.status)
            if(response.data.status != 'error'){
                setRedirect(response.data.redirect_to)
            }else{
                alert('oops something went wrong')
            }
            setLoading(false)
        }
        sendPost(formData)
    }

    function resize(e){
        for (var i = 0; i < (document.getElementsByClassName('userstext')).length; i++) {
            (document.getElementsByClassName('userstext'))[i].style.height = "5px";
            (document.getElementsByClassName('userstext'))[i].style.height = ((document.getElementsByClassName('userstext'))[i].scrollHeight)+"px";
        }

    }

    function start_size_textarea(){
        for (var i = 0; i < (document.getElementsByClassName('userstext')).length; i++) {
            (document.getElementsByClassName('userstext'))[i].style.height = "5px";
            (document.getElementsByClassName('userstext'))[i].style.height = ((document.getElementsByClassName('userstext'))[i].scrollHeight)+"px";
        }
    }

    useEffect(()=>{
        if(!auth.isAuthenticated){
            return (
                <Navigate to='/login'/>
            )
        }
        async function getPostData(){
            const PostData = await  axios.get(
                'http://127.0.0.1:8000/post/'+pid+'/',
                {
                        headers:
                        {
                            'Content-Type':'application/json',
                            'Authorization': 'Token '+auth.token
                        }
                }
            )
            setLoading(false)
            setPostData(PostData)
            setArticle(PostData.data.PostData.article)
            setText(PostData.data.PostData.text)
            setImages([...images,PostData.data.images])
        }
        start_size_textarea()
        if(loading){
            getPostData()
        }
    },[loading])


    if(loading){
        return (
            <h1>LOADING</h1>
        )
    }else{
        if(auth.userId != postdata.data.OwnerData.id){
            return (
                <Navigate to='/me'/>
            )
        }
        if(editedstatus == 'success'){
            return(
                <Navigate to={redirect}/>
            )
        }else{
            let tmp = 0
            let previous = 0
            let next = text.length
            return (
                <div>
                    <button onClick={upload}>EDIT</button>
                    <h2>article</h2>
                    <input
                        type="text"
                        onChange={(e)=>{
                        setArticle(e.target.value)}}
                        value={article}
                        /><br/><br/>
                    {postdata.data.images.map((image_item, index)=>{
                        next = image_item[1]
                        tmp = previous
                        previous = next
                        return(
                            <div>
                                <textarea
                                    style={{resize:'none'}}
                                    defaultValue={text.slice(tmp,previous)}
                                    onChange={resize}
                                    className='userstext'>
                                </textarea>
                                <br/>
                                {
                                    newimages[index]?<img
                                      src={URL.createObjectURL(newimages[index])}
                                      style={{width:'100px', height:'100px'}}
                                    />:<img
                                        style={{width:'100px', height:'100px'}}
                                        src={'http://127.0.0.1:8000/media/'+image_item[0]}
                                        alt=""/>
                                }
                                <input
                                type="file"
                                onChange={(e)=>{
                                    if(images.length == 0){
                                        newimages[0] = e.target.files[0]
                                    }else{
                                        newimages[index] = e.target.files[0]
                                        setRerender(!rerender)
                                    }

                                }}/><br/>
                            </div>
                        )
                    })}
                    <textarea
                        style={{resize:'none'}}
                        defaultValue={text.slice(previous, text.length)}
                        onChange={resize}
                        className='userstext'>
                    </textarea>
                    <button onClick={upload}>CHECK</button>
                </div>
            )
        }
    }

}
