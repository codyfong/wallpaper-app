import './App.css';

import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import Auth from './components/Auth';



import AuthContext from './store/authContext'

function App() {
  // const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <h1>App</h1>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path ="*" element = {<Home/>}/>

        </Routes>
    </div>
  );
}

export default App;
