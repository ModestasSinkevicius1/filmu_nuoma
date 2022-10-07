import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";
import ListItemA from "./ListItemA.jsx";

function ListA(){

    const { movies } = useContext(MovieContext);

    const CheckStatus = () =>{
        if(movies !== 'error'){
            return <ListItemA movies = {movies} />
        }
        else{
            return <span>Failed to fetch movies</span>
        }
    }

    return(
        <div className="List">
            <h1>Filmai</h1>
            {movies ? <CheckStatus /> : <span>Please wait..</span>}
        </div>
    );
}

export default ListA;