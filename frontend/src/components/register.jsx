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
    const [passerror, setPassError] = useState(false)
    const register = async() =>{
        const verify = val.password.length !== 0 && val.confirmpassword.length !== 0 && val.email.length !== 0
        if(val.password === val.confirmpassword && verify){
            try{
                const data = await axios.post("http://localhost:3000/register", val)
                if(data.data.status === "signup failed"){
                    alert(data.data.error)
                } else{
                    localStorage.setItem('userdetails', JSON.stringify(data.data.token))
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
        else{
            setError(true)
            setPassError(true)
        }
    }
    return(
        <div className="reg-con flex-row">
            <div className='register flex-col'>
                <h1>Sign Up</h1>
                <div className='singup-con flex-col'>
                    <input type="text" placeholder='Email' className='inp' onChange={(e)=>setval({...val,email:e.target.value})} value={val.email}/>
                    <input type="password" placeholder='Password' className='inp' onChange={(e)=>setval({...val,password:e.target.value})} value={val.password}/>
                    <input type="text" placeholder='Repeat password' className='inp' onChange={(e)=>setval({...val,confirmpassword:e.target.value})} value={val.confirmpassword}/>
                    <button id='continue' onClick={register}>Continue</button>
                </div>
            </div>
        </div>
    )
}
export default Register