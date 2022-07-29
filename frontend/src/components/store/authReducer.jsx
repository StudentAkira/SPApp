import { Cookies } from 'react-cookie';
import axios from 'axios'
const cookies = new Cookies();



let token = cookies.get('token')? cookies.get('token'):false
let userId = -1
let isAuthenticated = false
let isLoading = true
let username = ''



console.log(token)

const initialState = {
    token: token,
    userId: userId,
    isAuthenticated: isAuthenticated,
    isLoading:isLoading,
    username: username,
}




export const authReducer = (state = initialState, action ) => {
    switch(action.type){
        case 'SET_TOKEN': return {...state, token: action.payload }
        case 'SET_AUTH': return {...state, isAuthenticated: action.payload }
        case 'SET_ID': return {...state, userId: action.payload}
        case 'SET_LOADING': return {...state, isLoading: action.payload}
        case 'SET_USERNAME': return {...state, username: action.payload}
        default:
            return state
    }
}
