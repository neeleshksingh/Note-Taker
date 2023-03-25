import '../components/styles/nav.css'
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const Nav = () =>{
    const nav = useNavigate()
    const [data, setData] = useState([])
    const handleAddnote = () =>[
        nav('/add')
    ]
    const handleDelete = async()=>{
        await axios.delete("https://note-taker-ud8w.onrender.com/task")
        setData([])
        alert('data deleted successfully')
        nav('/add')
    }
    const handlelogout = () =>{
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
        window.location.replace('/')
    }
    return (
        <div className="nav flex-row">
            <div className='flex-row first'>
                <div className='flex-row'>
                    <HomeIcon/>
                    <h3 className='but' onClick={()=>nav('/landing')}>Home</h3>
                </div>
                <div className='flex-row'>
                    <AddIcon/>
                    <h3 className='but' onClick={handleAddnote}>Add Note</h3>
                </div>
                <div className='flex-row'>
                    <ClearIcon/>
                    <h3 className='but' onClick={handleDelete}>Delete All</h3>
                </div>
            </div>
            <div className='second'>
                <button className='logout' onClick={handlelogout}>Logout</button>
            </div>

        </div>
    )
}
export default Nav