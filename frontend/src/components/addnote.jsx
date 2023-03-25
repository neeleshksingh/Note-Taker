import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../components/styles/nav.css'

const Add =()=>{
    const nav = useNavigate()
    const [add, setAdd] = useState(false)
    const [formdata, setFormData] = useState({
        title : "",
        description : ""
    })
    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        try{
            if(add) return
            setAdd(true)
            const user = JSON.parse(localStorage.getItem('user'))._id
            const {title, description} = formdata
            if(!title || !description){
                alert('please fill all the details')
                return
            }
            const response = await axios.post(`https://note-taker-ud8w.onrender.com/task`, {
                title,
                description
            })
            alert("Task added successfully")
            nav('/landing')
        } catch(e){
            alert('error occured while adding task')
        }
    }
    return(
        <div className="add-con flex-row">
            <div className='add-form flex-col'>
                <form className='flex-col' onSubmit={handleSubmit}>
                    <div className='flex-col form-inp'>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' placeholder='Title' onChange={(e)=>setFormData({...formdata, title:e.target.value})} value={formdata.title}/>
                    </div>
                    <div className='flex-col form-inp'>
                        <label htmlFor="desc">Description</label>
                        <textarea placeholder='What is on your mind?' name="description" id="desc" cols="30" rows="10" onChange={(e)=>setFormData({...formdata, description:e.target.value})} value={formdata.description}></textarea>
                    </div>
                    <button id='add' type='submit'>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Add