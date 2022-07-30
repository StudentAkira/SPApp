import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate} from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from 'axios'

export const Login = () => {
            return (
                <a href='http://127.0.0.1:8000/login/vk-oauth2'>VK</a>
            );
    }
