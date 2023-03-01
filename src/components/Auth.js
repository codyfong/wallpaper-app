import {useState, useContext} from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import serverURL from '../url'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()


    const submitHandler = e => {
        e.preventDefault()
        const url = serverURL
        const body = {
            username,
            password
        }
        axios.post(register ? `${url}/register` : `${url}/login`, body)
            .then((res) => {
                const {token, exp, userId} = res.data
                console.log('AFTER AUTH', res.data)
                login(token, exp, userId)
                navigate('/')
            })
            .catch(err => {
                setPassword('')
                setUsername('')
                console.log(err)
            })
    }

    return(
    <div>
        <h1>Auth</h1>
        <form className='auth-form' onSubmit={submitHandler}>
            <input
                className='form-input'
                type = 'text'
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                className='form-input'
                type = 'password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            <button className='form-btn' onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
        </form>
    </div>
)}

export default Auth