import axios from "axios"

const Edit = () =>{

    axios.patch("")
    return(
        <div className="add-con flex-row">
            <div className='add-form flex-col'>
                <form className='flex-col'>
                    <div className='flex-col form-inp'>
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' placeholder='Title' />
                    </div>
                    <div className='flex-col form-inp'>
                        <label htmlFor="desc">Description</label>
                        <textarea placeholder='What is on your mind?' name="description" id="desc" cols="30" rows="10" ></textarea>
                    </div>
                    <button id='add' type='submit'>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Edit