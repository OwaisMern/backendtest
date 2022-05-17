import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import Login from './login/login'
import Register from './login/register'
import New_form from './login/new'
import Dashboard from './dashboard/dashboard'
import Editprofile from './dashboard/editprofile'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

function App() {

  // useEffect(() => {
  //   axios.get(`http://localhost:8080`)
  //     .then(res => {
  //   })
  // },[])


  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={ <Navigate to="/dashboard" replace={true} /> } />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/new" element={<New_form />} /> */}
          <Route path="/edit/:id" element={<Editprofile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/register" element={<New_form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
