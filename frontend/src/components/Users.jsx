import React, { useState, useRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Login} from './Login'
import {Registrate} from './Registrate'
import {User} from './User'

export const Users = () => {

        const users = [{username: 'user1', id: 1}, {username: 'user2', id: 2}, {username: 'user3', id: 3}, {username: 'user4', id: 4}]


        return (
            <div>
                {users.map((user, index) => { return (
                    <>
                        <Link to={'/users/user'+user.id} key={index}>{user.username}</Link><br/>
                    </>
                );})}
            </div>
    );
}
