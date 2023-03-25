import '../components/styles/nav.css'
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
const Nav = () =>{
    const nav = useNavigate()
    const handleAddnote = () =>[
        nav('/add')
    ]
    return (
        <div className="nav flex-row">
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
                <h3 className='but'>Delete All</h3>
            </div>
        </div>
    )
}
export default Nav