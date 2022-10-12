import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import MovieContext from "../../Contexts/MovieContext";
import { authConfig } from "../../Functions/auth";

function CommentsPage (){

    const [deleteData, setDeleteData] = useState(null);

    const { movies, setRefresh } = useContext(MovieContext);

    useEffect(()=>{
        if(deleteData === null){
            return;
        }
        axios.delete('http://localhost:3007/comments/' + deleteData.cid, authConfig())
        .then(res => setRefresh(Date.now()));
    }, [deleteData, setRefresh])

    return(
        <div className="cat">
            <hr></hr>
            <table>
                {movies !== 'error' ? 
                <thead>   
                    <tr>
                        <th>Movie</th>
                        <th>Comment</th>
                        <th>Option</th>
                    </tr>
                    {movies?.map((c, i) => c[1].map(com => com.post ?
                        <tr key={com.cid}>
                            <td>{com.title}</td>
                            <td>{com.post}</td>
                            <td>
                                <div className="cat-control">
                                    <button className="btn" onClick={() => setDeleteData(com)}>Delete</button>
                                </div>
                            </td>
                        </tr> : null )
                        
                    )}         
                </thead> : 
                <thead>
                    <tr>
                        <td>No comments</td>
                    </tr>
                </thead>
                }           
            </table>
        </div>
    )
}

export default CommentsPage;