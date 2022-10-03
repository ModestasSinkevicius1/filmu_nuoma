import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";

function Edit(){

    const { modalEdit, setModalEdit } = useContext(MovieContext);

    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('ds');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if(modalEdit === null){
            return;
        }
        setTitle(modalEdit.title);
        setCat(modalEdit.cat);
        setPrice(modalEdit.price);

    },[modalEdit])

    if(modalEdit === null){
        return null;
    }
    

    return(
        <div className="edit">
            <div className='edit-header-container'>
                <h3 className="edit-header">Edit movie</h3>
                <button className='exit-btn' onClick={() => setModalEdit(null)}>Exit</button>
            </div>
            <div className="edit-inputs">
                <input type='text' className='text-edit search-bar' value={title} onChange={e => setTitle(e.target.value)} />
                <select name="edit-select" id="edit-select" className="input-select edit-select" value={cat} onChange={e => setCat(e.target.value)}>
                    <option value='sd' disabled>Choose</option>
                    <option value='ds'>Bob</option>        
                </select>
                <input type='text' className='text-edit search-bar' value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className="edit-buttons">
                <button className="btn btn-edit" onClick={() => setModalEdit(null)}>Cancel</button>
                <button className="btn btn-edit">Confirm</button>
            </div>        
        </div>
    );
}

export default Edit;