import {useState, useContext} from 'react'
import AuthContext from '../store/authContext'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)

    const authCtx = useContext(AuthContext)

    return(
    <div>
        <h1>Auth</h1>
        <form>
            <input
                type = 'text'
                placeholder='username'
            />
            <input
                type = 'password'
                placeholder='password'
            />
        </form>
    </div>
)}

export default Auth