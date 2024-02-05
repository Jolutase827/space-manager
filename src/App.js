import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login/Login';
import RootInterface from './pages/RootInterface/RootInterface';
import CreateUser from './pages/CreateUser/CreateUser';
import UsersAdministration from './pages/RootInterface/pages/UsersAdministration/UsersAdministration';
import { useState } from 'react';
import EditUser from './pages/EditUser.jsx/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import SpaceAdministration from './pages/RootInterface/pages/SpaceAdministration/SpaceAdministration';
import SeasonAdministration from './pages/RootInterface/pages/SeasonAdministration/SeasonAdministration';
import CreateSpace from './pages/CreateSpace/CreateSpace';
import EditSpace from './pages/EditSpace/EditSpace';
import Space from './pages/Space/Space';
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
        <Header user={user} logout={logout}/>
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
            <Route path='aulas' element={<SpaceAdministration/>}/>
            <Route path='seasons' element={<SeasonAdministration/>}/>
          </Route>
          <Route path='/space/:id' element={
            <ProtectedRoute  
              isAllowed={!!user}
              redirectTo='/login' >
                <Space user={user}/>
            </ProtectedRoute>
          }/>
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
          <Route path='/createSpace' element={
            <ProtectedRoute  
              isAllowed={!!user && user.admin==="1"}
              redirectTo='/login' >
                <CreateSpace/>
            </ProtectedRoute>
          }/>
          <Route path='/editSpace/:id' element={
            <ProtectedRoute  
              isAllowed={!!user && user.admin==="1"}
              redirectTo='/login' >
                <EditSpace/>
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
