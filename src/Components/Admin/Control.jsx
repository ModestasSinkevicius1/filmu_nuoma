import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";

function Control( {movie} ){

    const { setDeleteData, setModalEdit } = useContext(MovieContext);

    return(
        <div className="control">
            <button className="btn edit-btn" onClick={() => setModalEdit(movie[1][0])}>Edit</button>
            <button className="btn edit-btn" onClick={() => setDeleteData(movie[1][0])}>Delete</button>
        </div>
    );
}

export default Control;