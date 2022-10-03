import { useContext } from "react";
import MovieContext from "../Contexts/MovieContext";
import Control from "./Admin/Control.jsx";
import star from '../imgs/icons/star.svg';

function ListItem({ movies }){

    const { setData } = useContext(MovieContext); 

    const rateMovie = (movie, rate) =>{

        const sum = rate + parseFloat(movie.rate_sum);
        const count = parseInt(movie.rate_count) + 1;
        const avg = sum / count;
        //useblackbox.io/landingPage
        console.log(movie);
        setData({
            id: movie.id,
            rating: avg,
            rate_count: parseInt(count),
            rate_sum: parseFloat(sum),
        });
    }
    return(
        movies?.map(m => 
        <div className="list-item" key={m.id}>
            <div className="item-image-container">

            </div>
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
                <div className="stars">
                    <span className="star-rate" id='star-rate-5' onClick={() => rateMovie(m, 1)}>
                        <img src={star} alt='star'></img>
                    </span>
                    <span className="star-rate" id='star-rate-4' onClick={() => rateMovie(m, 2)}>
                        <img src={star} alt='star'></img>
                    </span>
                    <span className="star-rate" id='star-rate-3' onClick={() => rateMovie(m, 3)}>
                        <img src={star} alt='star'></img>
                    </span>
                    <span className="star-rate" id='star-rate-2' onClick={() => rateMovie(m, 4)}>
                        <img src={star} alt='star'></img>
                    </span>
                    <span className="star-rate" id='star-rate-1' onClick={() => rateMovie(m, 5)}>
                        <img src={star} alt='star'></img>
                    </span>
                </div>
                <Control movie ={m}/>
            </div>
        </div>)      
    );
}

export default ListItem;