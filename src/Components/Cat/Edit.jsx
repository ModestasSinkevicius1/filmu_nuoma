import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import exit from '../../imgs/icons/exit.svg';
import CatContext from "../../Contexts/CatContext";

function Edit(){

    const { modalEdit, setModalEdit, setEditData } = useContext(CatContext);

    const [name, setName] = useState('');

    useEffect(() => {
        if(modalEdit === null){
            return;
        }
        setName(modalEdit.name);
    },[modalEdit])

    if(modalEdit === null){
        return null;
    }
    
    const saveCat = () =>{
        setEditData({
            id: modalEdit.id,
            name,
        })
        setModalEdit(null);
    }

    return(
        <div className="edit">
            <div className='edit-header-container'>
                <h3 className="edit-header">Edit category</h3>
                <img src={exit} alt='exit' className='exit-btn' onClick={() => setModalEdit(null)}></img>
            </div>
            <div className="edit-inputs">
                <label htmlFor="input-cat-edit-text" style={{fontSize: '14px'}}>Category:</label>
                <input type='text' name="input-cat-edit-text" id="input-cat-edit-text" className='text-edit search-bar' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="edit-buttons">
                <button className="btn btn-edit" onClick={() => setModalEdit(null)}>Cancel</button>
                <button className="btn btn-edit" onClick={saveCat}>Confirm</button>
            </div>        
        </div>
    );
}

export default Edit;