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
    const [newimage, setNewimage] = useState([])
    const [rerender, setRerender] = useState(true)
    const [article, setArticle] = useState('NO article')
    const [text, setText] = useState('')

    const {pid} = useParams()


    function upload(){
        let MainTexts = []
        let ImagesLocations = []
        let ImageLocation = 0
        for (var i = 0; i < (document.getElementsByClassName('userstext')).length-1; i++) {
            MainTexts += (document.getElementsByClassName('userstext'))[i].value
            ImageLocation += (document.getElementsByClassName('userstext'))[i].value.length
            ImagesLocations += ImageLocation+','
        }
        MainTexts += (document.getElementsByClassName('userstext'))[(document.getElementsByClassName('userstext')).length-1].value
        let formData = new FormData();
        formData.append('ImageLocations', ImagesLocations);
        formData.append('text', MainTexts)
        formData.append('article', article)

        async function sendPost(formData){
            const response = await axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/editpost/'+{pid}+'/',
              data: formData,
              headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Token '+auth.token
              }
            })
            console.log(response)
        }

        console.log(MainTexts, ImagesLocations, images)
    }

    function resize(e){
        for (var i = 0; i < (document.getElementsByClassName('userstext')).length; i++) {
            (document.getElementsByClassName('userstext'))[i].style.height = "5px";
            (document.getElementsByClassName('userstext'))[i].style.height = ((document.getElementsByClassName('userstext'))[i].scrollHeight)+"px";
        }

    }

    useEffect(()=>{
        if(!auth.isAuthenticated){
            document.location.href = '/login'
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
            console.log(PostData, PostData.data.PostData.text, PostData.data.PostData.article)
        }
        if(loading){
            getPostData()
        }
    },[loading])


    if(loading){
        return (
            <h1>LOADING</h1>
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
                                newimage[index]?<img
                                  src={URL.createObjectURL(newimage[index])}
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
                                    setNewimage([...newimage, e.target.files[0]])
                                }else{
                                    newimage[index] = e.target.files[0]
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
            </div>
        )
    }

}
