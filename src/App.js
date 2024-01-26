import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login/Login';
import RootInterface from './pages/RootInterface/RootInterface';
import CreateUser from './pages/CreateUser/CreateUser';
import UsersAdministration from './pages/RootInterface/UsersAdministration/UsersAdministration';
import { useState } from 'react';
import EditUser from './pages/EditUser.jsx/EditUser';
import { set } from 'react-hook-form';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [user,setUser] =  useState(null);
  const login = (user)=>{
    setUser(user);
  }
  const logout=()=>{
    setUser(null)
  }
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login login={login}/>}/>
          <Route path='/rootInterface/*' element={
            <ProtectedRoute  
            isAllowed={!!user && user.admin==="1"}
            redirectTo='/login' >
              <RootInterface/>
            </ProtectedRoute>
          }>
            <Route path='' element={<Navigate to="usuarios" />} />
            <Route path='usuarios' element={<UsersAdministration/>}/>
          </Route>
          <Route path='/createUser' element={
            <ProtectedRoute  
              isAllowed={!!user && user.admin==="1"}
              redirectTo='/login' >
                <CreateUser/>
            </ProtectedRoute>
          }/>
          <Route path='/editUser/:id' element={
            <ProtectedRoute  
            isAllowed={!!user && user.admin==="1"}
            redirectTo='/login' >
              <EditUser/>
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
