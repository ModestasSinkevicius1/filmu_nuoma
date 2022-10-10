import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";
import ListItem from "./ListItem.jsx";

function List(){

    const { movies } = useContext(MovieContext);

    const CheckStatus = () =>{
        if(movies !== 'error'){
            return <ListItem movies = {movies} />
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

export default List;