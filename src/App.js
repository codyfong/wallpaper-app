import './App.css';

import { Fragment, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home'
import Favorites from './components/Favorites';
import ImageDetails from './components/ImageDetails';
import AuthContext from './store/authContext'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import SignInSide from './components/Login';
import SignUp from './components/SignUp';

import { createTheme, colors, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette:{
    mode: 'dark',

  }
})

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {authCtx.token ? <ResponsiveAppBar /> : <></>}
      {/* <Header /> */}
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/auth' element={<SignInSide/>}/>
          <Route path='/' element={authCtx.token ? <Home/> : <Navigate to='/auth'/>}/>
          <Route path='/favorites' element={authCtx.token ? <Favorites/> : <Navigate to='/auth'/>}/>
          {/* <Route path='/profile' element={authCtx.token ?<Profile/> : <Navigate to='/auth'/>}/> */}
          <Route path='/imagedetails/:id' element={authCtx.token ?<ImageDetails/> : <Navigate to='/auth'/>}/>
        </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
