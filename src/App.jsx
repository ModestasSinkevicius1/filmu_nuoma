import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Create from './Components/Create';
import List from './Components/List';
import axios from 'axios';
import MovieContext from './Contexts/MovieContext';
import New from './Components/Admin/New';
import Edit from './Components/Admin/Edit';

function App() {

  const [movies, setMovies] = useState(null);

  const [data, setData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const [editData, setEditData] = useState(null);

  const [modalEdit, setModalEdit] = useState(null);

  const [create, setCreate] = useState(null);

  const [refresh, setRefresh] = useState(Date.now());

  useEffect(()=>{
    axios.get('http://localhost:3007/movies')
    .then(res => { setMovies(res.data) }).catch(_ => setMovies('error'));
  }, [refresh]);


  //Rate update
  useEffect(()=>{
    if(data === null){
      return;
    }
    axios.put('http://localhost:3007/movies/' + data.id, data)
    .then(res => setRefresh(Date.now()));
  }, [data]);

  useEffect(()=>{
    if(create === null){
      return;
    }
    axios.post('http://localhost:3007/movies', create)
    .then(res => setRefresh(Date.now()));
  }, [create])

  useEffect(() => {
    if (null === deleteData) {
        return;
    }
    axios.delete('http://localhost:3007/movies/'+ deleteData.id)
    .then(res => setRefresh(Date.now()));
  }, [deleteData]);

  return (
    <div className="App">
      <MovieContext.Provider value={{
        movies,
        setData,
        setCreate,
        setDeleteData,
        modalEdit,
        setModalEdit,
      }}>
      <header className="App-header">
        <nav>
          <span>Admin</span>
          <span>Client</span>
        </nav>
        <Create />
        <New />
        <List />
      </header>
      <footer>
        <span className='footer-title'>Filmai inc.</span>
        <span>&copy; Anonymous</span>
      </footer>
      <Edit />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
