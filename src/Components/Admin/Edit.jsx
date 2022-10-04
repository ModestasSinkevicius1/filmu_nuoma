import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";
import exit from '../../imgs/icons/exit.svg';
import reverse from '../../imgs/icons/reverse.svg';
import delIcon from '../../imgs/icons/delete.svg';
import { useRef } from "react";
import getBase64 from "../../Functions/getBase64";

function Edit(){

    const { modalEdit, setModalEdit, setEditData } = useContext(MovieContext);

    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('ds');
    const [price, setPrice] = useState('');

    const fileInput = useRef();

    const [photoPrint, setPhotoPrint] = useState(null);
    const [isPhotoDel, setIsPhotoDel] = useState(false);

    const [fade, setFade] = useState(100);

    useEffect(() => {
        if(modalEdit === null){
            return;
        }
        setTitle(modalEdit.title);
        setCat(modalEdit.category);
        setPrice(modalEdit.price);
        setPhotoPrint(modalEdit.image);

    },[modalEdit])

    if(modalEdit === null){
        return null;
    }

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
    }
    
    const saveMovie = () =>{
        setEditData({
            id: modalEdit.id,
            title,
            price,
            cat,
            image: !isPhotoDel ? photoPrint : null,
        })
        setFade(100);
        setIsPhotoDel(false);
        setModalEdit(null);
    }

    const removePhoto = () =>{
        setIsPhotoDel(p => !p);
        setFade(f => f === 100 ? 30 : 100 );
    }

    return(
        <div className="edit">
            <div className='edit-header-container'>
                <h3 className="edit-header">Edit movie</h3>
                <img src={exit} alt='exit' className='exit-btn' onClick={() => setModalEdit(null)}></img>
            </div>
            <div className="edit-inputs">
                <input type='text' className='text-edit search-bar' value={title} onChange={e => setTitle(e.target.value)} />
                <select name="edit-select" id="edit-select" className="input-select edit-select" value={cat} onChange={e => setCat(e.target.value)}>
                    <option value='none' disabled>Choose</option>
                    <option value='Drama'>Drama</option>
                    <option value='Action'>Action</option>
                    <option value='Comedy'>Comedy</option>        
                </select>
                <input type='text' className='text-edit search-bar' value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className="select-container">
                <label htmlFor="input_select_rating" className="select-title">Image:</label>
                {/* read only file type */}
                <input type="file" ref={fileInput} onChange={doPhoto} className="search-bar new-text new-file" accept="image/*"></input>
            
                <div className="select-container">
                    
                    { photoPrint ? 
                        <div className="img-bin" style={{opacity: fade + '%'}}>
                            <div className="del-image-container" onClick={removePhoto}>
                                <img src={!isPhotoDel ? delIcon : reverse} alt="delete" className="preview-image-icon"></img>
                            </div>
                            <img src={photoPrint} alt='preview'></img>
                        </div> : null }
                </div>
            </div>
            <div className="edit-buttons">
                <button className="btn btn-edit" onClick={() => setModalEdit(null)}>Cancel</button>
                <button className="btn btn-edit" onClick={saveMovie}>Confirm</button>
            </div>        
        </div>
    );
}

export default Edit;