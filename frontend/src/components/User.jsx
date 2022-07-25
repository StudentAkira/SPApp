import React, { useState } from 'react'
import {useParams} from "react-router-dom";

export const User = (props) => {

        const {uid} = useParams()

        return (
        <div>
            <h1>user {uid}</h1><br/>
        </div>
    );
}
