import './App.css';
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'


import AuthContext from './store/authContext'

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
