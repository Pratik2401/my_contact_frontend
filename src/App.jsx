import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './assets/components/NavbarComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './assets/components/Home';
import Login from './assets/components/Login';
import Contacts from './assets/components/Contacts';
import { useState } from 'react';
function App() {

  const [username,setusername]=useState('')
  const [isLoggedIn,setisLoggedIn]=useState(false)
  return (
    <Router>
      <NavbarComponent  isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username}   setusername={setusername}/>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username}   setusername={setusername}/>} />
        <Route path="/login" element={<Login  isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username}   setusername={setusername}/>} />
        <Route path="/contacts" element={<Contacts isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} username={username}   setusername={setusername}/>} />
      </Routes>
    </Router>
  );
}

export default App;

