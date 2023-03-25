import '../components/styles/nav.css'
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Nav = () =>{
    const nav = useNavigate()
    const handleAddnote = () =>[
        nav('/add')
    ]
    const handleDelete = async()=>{
        await axios.delete("https://note-taker-ud8w.onrender.com/task")
        nav('/landing')
        window.location.reload()
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
                    <h3 className='but'>Home</h3>
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