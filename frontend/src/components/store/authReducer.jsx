import { Cookies } from 'react-cookie';
import axios from 'axios'
const cookies = new Cookies();



let token = cookies.get('token')? cookies.get('token'):false
let userId = false
let isAuthenticated = userId?true:false
let isLoading = true


const initialState = {
    token: token,
    userId: userId,
    isAuthenticated: isAuthenticated,
    isLoading:isLoading
}




export const authReducer = (state = initialState, action ) => {
    switch(action.type){
        case 'SET_TOKEN': return {...state, token: action.payload }
        case 'SET_AUTH': return {...state, isAuthenticated: action.payload }
        case 'SET_ID': return {...state, userId: action.payload}
        case 'SET_LOADING': return {...state, isLoading: action.payload}
        default:
            return state
    }
}
