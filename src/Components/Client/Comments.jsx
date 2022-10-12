import { useState } from "react";
import { useContext } from "react";
import MovieContext from "../../Contexts/MovieContext";

function Comments({ m }){

    const { setNewComment } = useContext(MovieContext);

    const [text, setText] = useState('');

    const saveComment = () =>{
        setNewComment({
            post: text,
            movie_id: m[0].id,
        });
    }
    return(
        <>
            <h2 className="comment-new-title">New comment</h2>
            <div className="comment-new">
                <textarea className="comment-textarea" value={text} onChange={e => setText(e.target.value)}></textarea>
                <div className="comment-btn-container">
                    <button className='btn' onClick={saveComment}>Post</button>
                </div>
            </div>
            { m[0].post ?
            <div className="comment-container">
                <hr></hr>
                <h3>Comments</h3>
                {m.slice(0).reverse().map(com => 
                    <div className="comment-area" key={com.cid}>
                        <span style={{fontWeight: 'bold', display: 'block'}}>Anonymous:</span><br></br>
                        <span>{com.post}</span>
                    </div>
                )
                }
                
            </div>
            : null}   
        </>
    );
}

export default Comments;