import { useContext, useState } from "react";
import CatContext from "../../Contexts/CatContext";

function Create() {

    const [name, setName] = useState('');

    const { setSaveData } = useContext(CatContext);

    const saveCat = () =>{
        setSaveData({
            name,
        })
        setName('');
    }
    
    return (
        <div className="cat-input-container">
        <label htmlFor="cat_text" className="select-title">
            New category:
        </label>
        <input
            type="text"
            name="cat_text"
            id="cat_text"
            className="search-bar input-cat-text"
            value={name}
            onChange={e => setName(e.target.value)}
        ></input>
        <button className="btn" onClick={saveCat}>Add</button>
        </div>
    );
}

export default Create;
