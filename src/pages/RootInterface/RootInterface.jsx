import React from 'react'
import { Navigate, Outlet, Route, Router, Routes, useParams } from 'react-router-dom';
import Nav from './components/Nav';
import UsersAdministration from './UsersAdministration/UsersAdministration';
import ProtectedRoute from '../../components/ProtectedRoute';

function RootInterface(){
    return (
        <div>
            <Nav/> 

            <Outlet/>
        </div>
    )
}

export default RootInterface