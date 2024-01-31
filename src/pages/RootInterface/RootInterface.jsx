import React from 'react'
import {  Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function RootInterface(){
    return (
        <div>
            <Nav/> 

            <Outlet/>
        </div>
    )
}

export default RootInterface