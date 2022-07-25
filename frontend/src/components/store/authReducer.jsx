import { Cookies } from 'react-cookie';
const cookies = new Cookies();

let token = cookies.get('token')? cookies.get('token'):false
let isAuthenticated = token?true:false

const initialState = {
    token: token,
    isAuthenticated:isAuthenticated,
}

export const authReducer = (state = initialState, action ) => {
    switch(action.type){
        case 'SET_TOKEN': return {...state, token: action.payload }
        case 'SET_AUTH': return {...state, isAuthenticated: action.payload }
        default:
            return state
    }
}
