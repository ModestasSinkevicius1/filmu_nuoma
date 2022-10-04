import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import MovieContext from "../../Contexts/MovieContext.jsx";
import getBase64 from "../../Functions/getBase64.js";

import delIcon from '../../imgs/icons/delete.svg';

function New(){

    const { setCreate } = useContext(MovieContext);

    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('ds');
    const [price, setPrice] = useState('');

    const fileInput = useRef();

    const [photoPrint, setPhotoPrint] = useState(null);

    const saveMovie = () =>{
        setCreate({
            title,
            price,
            cat,
            image: photoPrint,
        });
        setTitle('');
        setPrice('');
        setCat('ds');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
    }

    return(
        <div className="Create New">
            <div className="input-container input-container-new">
                <div className="select-container">
                    <label htmlFor="input_select_genre" className="select-title">New movie:</label>
                    <input type='text' className="search-bar new-text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Movie"></input>
                </div>
                <div className="select-container">
                    <label htmlFor="input_select_genre" className="select-title">New genre:</label>
                    <select className="input-select" id='input_select_genre' name='input_select_genre' value={cat} onChange={e => setCat(e.target.value)}>
                        <option value='none' disabled>Choose</option>
                        <option value='Drama'>Drama</option>
                        <option value='Action'>Action</option>
                        <option value='Comedy'>Comedy</option>
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="input_select_rating" className="select-title">Price:</label>
                    <input type="text" className="search-bar new-text" placeholder="0" value={price} onChange={e => setPrice(e.target.value)}></input>
                </div>
                <div className="image-container">
                    <div className="select-container">
                        <label htmlFor="input_select_rating" className="select-title">Image:</label>
                        {/* read only file type */}
                        <input type="file" ref={fileInput} onChange={doPhoto} className="search-bar new-text new-file" accept="image/*"></input>
                    
                        <div className="select-container">
                            
                            { photoPrint ? 
                                <div className="img-bin">
                                    <div className="del-image-container" onClick={() => setPhotoPrint(null)}>
                                        <img src={delIcon} alt="delete" className="preview-image-icon"></img>
                                    </div>
                                    <img src={photoPrint} alt='preview'></img>
                                </div> : null }
                        </div>
                    </div>
                </div>
                <div className="select-container">
                    <button className="btn btn-new" onClick={saveMovie}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default New;