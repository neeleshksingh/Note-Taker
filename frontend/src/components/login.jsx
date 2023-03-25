import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../components/styles/login.css'

const Login = () =>{
    const [data, setData] = useState({email:"", password:""})
    const [error, setError] = useState('')
    const nav = useNavigate()
    const handleLogin = async()=>{
        if(!data.email || !data.password){
            setError('All fields are necessary')
            return
        }
        try{
            if(data.email && data.password){
                const user = await axios.post('https://note-taker-ud8w.onrender.com/login', data)
                if(user.data.token){
                    localStorage.setItem('jwt', data.token)
                    localStorage.setItem('user', JSON.stringify(user.data.user))
                    setData({email:'', password:''})
                    nav('/landing')
                }
            }
        } catch(e){
            setError('User not found')
        }
    }
    const handleReg = () =>{
        nav('/register')
    }
    return (
        <div className="container flex-row">
            <div className='login flex-col'>
                <h1>Sign In</h1>
                <div className='signin flex-col'>
                    <div className='flex-col email'>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder='Email Address' className='inp' onChange={(e)=>setData({...data, email:e.target.value})} value={data.email} />
                    </div>
                    <div className='flex-col pass'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' className='inp' onChange={(e)=>setData({...data, password:e.target.value})} value={data.password}/>
                    </div>
                    {error && <p className='error'>
                        {error}
                    </p>}
                    <div>
                        <input type="checkbox" />Remember Me
                    </div>
                    <div>
                        <button id='submit' onClick={handleLogin}>Submit</button>
                    </div>
                    <div>
                        <button id='signup' onClick={handleReg}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login