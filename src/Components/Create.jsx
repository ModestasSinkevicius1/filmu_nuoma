function Create(){
    return(
        <div className="Create">
            <div className="search-container">
                <input placeholder="Search here..." type='search' className="search-bar" id='search_bar' name='search_bar'></input>
            </div>
            <div className="btn-container">
                <button className="btn">Search</button>
            </div>
            <hr></hr>
            <div className="input-container">
                <div className="select-container">
                    <label htmlFor="input_select_genre" className="select-title">Genre:</label>
                    <select className="input-select" value={0} id='input_select_genre' name='input_select_genre'>
                        <option value={0} disabled>Choose</option>
                        <option value={1}>Bob</option>
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="input_select_rating" className="select-title">Rating:</label>
                    <select className="input-select" value={0} id='input_select_rating' name='input_select_rating'>
                        <option value={0} disabled>Choose</option>
                        <option value={1}>Bob</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Create;