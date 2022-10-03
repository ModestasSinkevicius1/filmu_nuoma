import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";

function Control( {movie} ){

    const { setDeleteData, setModalEdit } = useContext(MovieContext);

    return(
        <div className="control">
            <button className="btn edit-btn" onClick={() => setModalEdit(movie)}>Edit</button>
            <button className="btn edit-btn" onClick={() => setDeleteData(movie)}>Delete</button>
        </div>
    );
}

export default Control;