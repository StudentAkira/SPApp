import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Postcreator = () => {

    const auth = useSelector(state => state.auth)
    const [images, setImages] = useState([])
    const [article, setArticle] = useState('NO article')
    const [rerender, setRerender] = useState(true)

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
        for (var i = 0; i < images.length; i++){
            formData.append('image'+i, images[i]);
        }
        formData.append('ImageLocations', ImagesLocations);
        formData.append('text', MainTexts)
        formData.append('article', article)

        async function sendPost(formData){
            const response = await axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/createpost/',
              data: formData,
              headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Token '+auth.token
              }
            })
            console.log(response)
        }
        sendPost(formData)

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
            document.location.href = 'login'
        }
    },[])


    return (
        <div>
            <h1>POSTCREATOR</h1>
            <div className="creator">
                <h3>Main content</h3>
                    <button onClick={upload}>upload</button><br/><br/>
                    <h2>Article</h2>
                    <input type="text" onChange={(e)=>{
                        setArticle(e.target.value)
                    }}/><br/><br/>

                <div>
                    <textarea
                        style={{resize:'none'}}
                        onChange={(e)=>{resize(e)}}
                        className='userstext'
                        id='0'>
                    </textarea><br/>

                    <input
                    type="file"
                    onChange={(e)=>{
                        if(images.length == 0){
                            setImages([...images, e.target.files[0]])
                        }else{
                            images[0] = e.target.files[0]
                            setRerender(!rerender)
                        }
                    }}/><br/>
                    <div>
                    {images.map((image, index)=>{
                        console.log(image)
                        return (
                            <div>
                                <img
                                  src={URL.createObjectURL(image)}
                                  style={{width:'100px', height:'100px'}}
                                /><br/>

                                <textarea
                                    style={{resize:'none'}}
                                    onChange={(e)=>{resize(e)}}
                                    className='userstext'>
                                </textarea><br/>
                                <input
                                style={{display:index>=3?'none':'block'}}
                                type="file"
                                onChange={(e)=>{
                                    if(images.length == 0){
                                        setImages([...images, e.target.files[0]])
                                    }else{
                                        images[index+1] = e.target.files[0]
                                        setRerender(!rerender)
                                    }

                                }}/><br/>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
