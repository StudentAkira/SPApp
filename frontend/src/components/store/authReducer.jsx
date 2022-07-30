import { Cookies } from 'react-cookie';
import axios from 'axios'
const cookies = new Cookies();


let token = cookies.get('token')? cookies.get('token'):undefined
let userId = cookies.get('userId')?cookies.get('userId'):undefined
let isAuthenticated = userId?true:false
let username = 'default'


const initialState = {
    token: token,
    userId: userId,
    isAuthenticated: isAuthenticated,
    username: username,
}

export const authReducer = (state = initialState, action ) => {
    switch(action.type){
        case 'SET_TOKEN': return {...state, token: action.payload }
        case 'SET_AUTH': return {...state, isAuthenticated: action.payload }
        case 'SET_ID': return {...state, userId: action.payload}
        case 'SET_USERNAME': return {...state, username: action.payload}
        default:
            return state
    }
}
