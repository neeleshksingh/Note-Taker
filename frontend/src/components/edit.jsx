import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../components/styles/nav.css'
const Edit = () =>{
    const {id} = useParams()
    const nav = useNavigate()
    const [title, setTitle] = useState("")
    const [description ,  setDescription] = useState('')
    useEffect(()=>{
        axios.get(`https://note-taker-ud8w.onrender.com/task/${id}`, {
           headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
           }, 
        }).then((res)=>{
            setTitle(res.data.title)
            setDescription(res.data.description)
        }).catch((e)=>console.log(e))
    },[id])

    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    }
    const handleDescriptionChange = (e)=>{
        setDescription(e.target.value)
    }

    const handleSubmit = (e)=>{
        axios.patch(`https://note-taker-ud8w.onrender.com/task/${id}`,{
            title : title,
            description : description
        },
        {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(()=>nav('/landing')).catch((e)=>console.log(e))
    }
    return(
        <div className="add-con flex-row">
            <div className='add-form flex-col'>
                <form className='flex-col' onSubmit={handleSubmit}>
                    <div className='flex-col form-inp'>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' placeholder='Title' value={title} onChange={handleTitleChange} />
                    </div>
                    <div className='flex-col form-inp'>
                        <label htmlFor="desc">Description</label>
                        <textarea placeholder='What is on your mind?' name="description" id="desc" cols="30" rows="10" value={description} onChange={handleDescriptionChange} ></textarea>
                    </div>
                    <button id='add' type='submit'>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Edit