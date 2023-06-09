import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../components/styles/register.css'

const Register = () =>{
    const nav =useNavigate()
    const [val,setval] = useState({
        email : "",
        password : "",
        confirmpassword: ""
    })
    const [error, setError] = useState(false)
    //const [passerror, setPassError] = useState(false)
    const register = async() =>{
        const verify = val.password.length !== 0 && val.confirmpassword.length !== 0 && val.email.length !== 0
        if(verify){
            if(val.password === val.confirmpassword){
                try{
                    const data = await axios.post("https://note-taker-ud8w.onrender.com/register", val)
                    if(data.data.status === "signup failed"){
                        alert(data.data.error)
                    } else{
                        localStorage.setItem('userdetails', JSON.stringify(data.data.userInfo))
                        localStorage.setItem('token', JSON.stringify(data.data.token))
                        setval({
                            email : "",
                            password : "",
                            confirmpassword : ""
                        })
                        nav('/')
                    }
                }catch(e){
                    alert('Userid Exist')
                }
            }
        }
        
        else{
            setError(true)
        }
    }
    return(
        <div className="reg-con flex-row">
            <div className='register flex-col'>
                <h1>Sign Up</h1>
                <div className='singup-con flex-col'>
                    <input type="text" placeholder='Email' className='inp' onChange={(e)=>setval({...val,email:e.target.value})} value={val.email}/>
                    {error && val.email.length === 0 && <p className='error'>Email is required</p>}
                    <input type="password" placeholder='Password' className='inp' onChange={(e)=>setval({...val,password:e.target.value})} value={val.password}/>
                    {error && val.password.length === 0 && <p className='error'>Password is required</p>}
                    <input type="text" placeholder='Repeat password' className='inp' onChange={(e)=>setval({...val,confirmpassword:e.target.value})} value={val.confirmpassword}/>
                    {error && val.confirmpassword.length === 0 && <p className='error'>Confirm password is required</p>}
                    <button id='continue' onClick={register}>Continue</button>
                </div>
            </div>
        </div>
    )
}
export default Register