import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CatContext from "../../Contexts/CatContext";
import Create from "./Create";
import Edit from "./Edit";

function Cat (){

    const [saveData, setSaveData] = useState(null);

    const [cats, setCats] = useState(null);

    const [refresh, setRefresh] = useState(Date.now());

    const [deleteData, setDeleteData] = useState(null);

    const [modalEdit, setModalEdit] = useState(null);

    const [editData, setEditData] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:3007/cats')
        .then(res => {  
            setCats(res.data)})
        .catch(_ => setCats('error'));
    }, [refresh]);

    useEffect(()=>{
        if(saveData === null){
            return;
        }
        axios.post('http://localhost:3007/cats', saveData)
        .then(res => setRefresh(Date.now()));
    }, [saveData])

    useEffect(()=>{
        if(deleteData === null){
            return;
        }
        axios.delete('http://localhost:3007/cats/' + deleteData.id)
        .then(res => setRefresh(Date.now()));
    }, [deleteData])

    useEffect(()=>{
        if(editData === null){
            return;
        }
        axios.put('http://localhost:3007/cats/' + editData.id, editData)
        .then(res => setRefresh(Date.now()));
    }, [editData])

    return(
        <CatContext.Provider value={{
            cats,
            setSaveData,
            setModalEdit,
            modalEdit,
            setEditData,
        }}>
        <div className="cat">
            <Create />
            <hr></hr>
            <table>
                {cats !== 'error' ? 
                <thead>   
                    <tr>
                        <th>Row</th>
                        <th>Category</th>
                        <th>Options</th>
                    </tr>
                    {cats?.map((c, i) =>
                        <tr key={c.id}>
                            <td>{i + 1}</td>
                            <td>{c.name}</td>
                            <td>
                                <div className="cat-control">
                                    <button className="btn" onClick={() => setDeleteData(c)}>Delete</button>
                                    <button className="btn" onClick={() => setModalEdit(c)}>Edit</button>
                                </div>
                            </td>
                        </tr> 
                    )}         
                </thead> : 
                <thead>
                    <tr>
                        <td>No categories</td>
                    </tr>
                </thead>
                }           
            </table>
            <Edit />
        </div>
        </CatContext.Provider>
    )
}

export default Cat;