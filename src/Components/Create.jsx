import { useContext } from "react";
import MovieContext from "../Contexts/MovieContext";

function Create(){

    const { genre, setGenre, setMovies, filterWhat, sort, setSort, rateSort, setRateSort } = useContext(MovieContext);

    const search = () =>{
        switch(sort){
            case 'Ascend':
                setMovies(m => [...m].sort((a, b) => a.price - b.price));
                break;
            case 'Descend':
                setMovies(m => [...m].sort((b, a) => a.price - b.price));
                break;
            default:
        }
        if(genre === 'All' && rateSort === 'All'){
            setMovies(m => m.map(mo => ({...mo, show: true})));
            filterWhat.current = null;
        }
        else{
            setMovies(m => m.map(mo => ((mo.category === genre || 'All' === genre) && (mo.rating > parseInt(rateSort) || 'All' === rateSort)) ? {...mo, show: true} : {...mo, show: false}));
            filterWhat.current = genre;
        }
    }

    //MD5, SHA1 not supported
    //SHA256 supported

    return(
        <div className="Create">
            <div className="search-container">
                <input placeholder="Search here..." type='search' className="search-bar" id='search_bar' name='search_bar'></input>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={search}>Search</button>
            </div>
            <hr></hr>
            <div className="input-container">
                <div className="select-container">
                    <label htmlFor="input_select_rating" className="select-title">Sort:</label>
                    <select className="input-select" id='input_select_rating' name='input_select_rating' value={sort} onChange={e => setSort(e.target.value)}>
                        <option value='Ascend'>Ascend</option>
                        <option value='Descend'>Descend</option>
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="input_select_genre" className="select-title">Genre:</label>
                    <select className="input-select" id='input_select_genre' name='input_select_genre' value={genre} onChange={e => setGenre(e.target.value)}>
                        <option value='none' disabled>Choose</option>
                        <option value='All'>All</option>
                        <option value='Drama'>Drama</option>
                        <option value='Action'>Action</option>
                        <option value='Comedy'>Comedy</option>
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="input_select_rating" className="select-title">Rating:</label>
                    <select className="input-select" id='input_select_rating' name='input_select_rating' value={rateSort} onChange={e => setRateSort(e.target.value)}>
                        <option value='All'>All</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Create;