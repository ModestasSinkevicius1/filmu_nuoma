import { useContext } from "react";
import MovieContext from "../Contexts/MovieContext";

function ListItem({ movies }){

    const { setData } = useContext(MovieContext); 

    const rateMovie = (movie, rate) =>{

        const count = parseInt(movie.rate_count) + 1;
        const avg = (rate + parseFloat(movie.rating)) / count;
        //useblackbox.io/landingPage
        console.log(rate);
        // setData({
        //     id: movie.id,
        //     rating: avg,
        //     rate_count: parseInt(count),
        // })
    }
    return(
        movies?.map(m => 
        <div className="list-item" key={m.id}>
            <div className="left-item">
                <div className="item-info-minor">
                    <h2>{m.title}</h2>
                    <h3>{m.category}</h3>
                    <h2 className="item-price-title">{m.price}&euro;</h2>
                </div>
                <div className="item-info-major">
                    <span>{m.rating} stars</span>
                </div>
            </div>
            <div className="right-item">
                <span className="star-rate" id='star-rate-5' onClick={() => rateMovie(m, 1)}>
                    X
                </span>
                <span className="star-rate" id='star-rate-4' onClick={() => rateMovie(m, 2)}>
                    X
                </span>
                <span className="star-rate" id='star-rate-3' onClick={() => rateMovie(m, 3)}>
                    X
                </span>
                <span className="star-rate" id='star-rate-2' onClick={() => rateMovie(m, 4)}>
                    X
                </span>
                <span className="star-rate" id='star-rate-1' onClick={() => rateMovie(m, 5)}>
                    X
                </span>
            </div>
        </div>)      
    );
}

export default ListItem;