import {useState, useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../store/authContext';

const Header = () => {
    const authCtx = useContext(AuthContext)
    const {userId} = useContext(AuthContext)

    

    return(
    <header>
        <h2>App Name / User {userId}</h2>
        <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
        <nav>
            <Link to="/auth">
                <button>Login</button>
            </Link>
            <Link to="">
                <button>Home</button>
            </Link>
            <Link to="/profile">
                <button>Profile</button>
            </Link>
            <Link to="/favorites">
                <button>Favorites</button>
            </Link>
        </nav>
    </header>
)}

export default Header