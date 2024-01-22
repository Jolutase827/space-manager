import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login/Login';
import RootInterface from './pages/RootInterface/RootInterface';
import CreateUser from './pages/CreateUser/CreateUser';
import UsersAdministration from './pages/RootInterface/UsersAdministration/UsersAdministration';
function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/rootInterface/*' element={<RootInterface/>}>
            <Route path='' element={<Navigate to="usuarios" />} />
            <Route path='usuarios' element={<UsersAdministration/>}/>
          </Route>
          <Route path='/createUser' element={<CreateUser/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
