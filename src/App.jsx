import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Create from './Components/Create';
import List from './Components/List';
import axios from 'axios';
import MovieContext from './Contexts/MovieContext';
import New from './Components/Admin/New';
import Edit from './Components/Admin/Edit';

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

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

  useEffect(() => {
    if(null === editData){
      return;
    }
    axios.put('http://localhost:3007/movies/full/'+ editData.id, editData)
    .then(res => setRefresh(Date.now()));
  }, [editData])

  return (
    <BrowserRouter>
      <div className="App">
        <MovieContext.Provider value={{
          movies,
          setData,
          setCreate,
          setDeleteData,
          modalEdit,
          setModalEdit,
          setEditData,
        }}>
        <header className="App-header">
          <nav>
            <NavLink to='admin' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Admin</NavLink>
            <NavLink to='client' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Client</NavLink>
          </nav>
          <Create />
          <Routes>
            <Route path='admin' element={<New />}></Route>
          </Routes>
          <List />
        </header>
        <footer>
          <span className='footer-title'>Filmai inc.</span>
          <span>&copy; Anonymous</span>
        </footer>
        <Edit />
        </MovieContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
