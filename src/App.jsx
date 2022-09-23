import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Create from './Components/Create';
import List from './Components/List';
import axios from 'axios';
import MovieContext from './Contexts/MovieContext';

function App() {

  const [movies, setMovies] = useState(null);

  const [data, setData] = useState(null);

  const [refresh, setRefresh] = useState(Date.now());

  useEffect(()=>{
    axios.get('http://localhost:3007/movies')
    .then(res => { setMovies(res.data) }).catch(_ => setMovies('error'));
  }, [refresh]);

  useEffect(()=>{
    if(data === null){
      return;
    }
    axios.put('http://localhost:3007/movies/'+data.id, data)
    .then(res => setRefresh(Date.now()));
  }, [data]);

  return (
    <div className="App">
      <MovieContext.Provider value={{
        movies,
        setData,
      }}>
      <header className="App-header">
        <nav>
          <span>Admin</span>
          <span>Client</span>
        </nav>
        <Create />
        <List />
      </header>
      <footer>
        <span className='footer-title'>Filmai inc.</span>
        <span>&copy; Anonymous</span>
      </footer>
      </MovieContext.Provider>
    </div>
  );
}

export default App;
