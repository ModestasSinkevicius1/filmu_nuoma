import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";
import star from '../../imgs/icons/star.svg';
import noImage from '../../imgs/no-image.jpg';
import Comments from "./Comments";

function ListItem({ movies }){

    const { setData, cats } = useContext(MovieContext); 

    const rateMovie = (movie, rate, genre) =>{
        const sum = rate + parseFloat(movie[1][0].rate_sum);
        const count = parseInt(movie[1][0].rate_count) + 1;
        const avg = sum / count;
        //useblackbox.io/landingPage
        setData({
            id: movie[1][0].id,
            rating: avg,
            rate_count: parseInt(count),
            rate_sum: parseFloat(sum),
        });
    }
    console.log(movies);
    return(
        movies?.map((m, i) => m[2].show ?
        <div className="list-item" key={i}>
            <div className="item-image-container">
                {m[1][0].image ? <img src={m[1][0].image} alt={m.title}></img> : <><img src={noImage} alt='not found'></img> <h1 style={{position: 'absolute', fontSize: '16px', marginTop: '200px'}}>Wheres image? </h1></>}        
            </div>
            <div className="left-item">
                <div className="item-info-minor">
                    <h2>{m[0]}</h2>
                    <h3>{cats?.find(c => m[1][0].category === c.id)?.name}</h3>
                    <h2 className="item-price-title">{m[1][0].price}&euro;</h2>
                </div>
                <div className="item-info-major">
                    <span>{m[1][0].rating} stars</span>
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
            </div>
            <Comments m = {m[1]} />   
        </div> : null)
    );
}

export default ListItem;