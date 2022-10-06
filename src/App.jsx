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
import { useRef } from 'react';
import { authConfig } from './Functions/auth';
import { RequireAuth } from './Components/Auth/Auth';
import { LoginPage } from './Components/Auth/Login';
import { LogoutPage } from './Components/Auth/Logout';
import Cat from './Components/Cat/Cat';

function App() {

  const [movies, setMovies] = useState(null);

  const [data, setData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const [editData, setEditData] = useState(null);

  const [modalEdit, setModalEdit] = useState(null);

  const [create, setCreate] = useState(null);

  const [refresh, setRefresh] = useState(Date.now());

  const [genre, setGenre] = useState('All');

  const [sort, setSort] = useState('Default');

  const [rateSort, setRateSort] = useState('All');

  const [listGenre, setListGenre] = useState([]);

  const filterWhat = useRef(null);

  const [cats, setCats] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:3007/movies', authConfig())
    .then(res => {
      if(filterWhat.current)
        setMovies(res.data.map((d, i) => filterWhat.current === d.category ? {...d, show: true, row: i} : {...d, show: false, row: i}));
      else     
        setMovies(res.data.map((d, i) => ({...d, show: true, row: i})))})
    .catch(_ => setMovies('error'));
  }, [refresh]);

  useEffect(()=>{
    axios.get('http://localhost:3007/cats', authConfig())
    .then(res => {
        setCats(res.data)})
    .catch(_ => setCats('error'));
  }, [refresh]);

  //Rate update
  useEffect(()=>{
    if(data === null){
      return;
    }
    axios.put('http://localhost:3007/movies/' + data.id, data, authConfig())
    .then(res => setRefresh(Date.now()));
  }, [data]);

  useEffect(()=>{
    if(create === null){
      return;
    }
    axios.post('http://localhost:3007/movies', create, authConfig())
    .then(res => setRefresh(Date.now()));
  }, [create])

  useEffect(() => {
    if (null === deleteData) {
        return;
    }
    axios.delete('http://localhost:3007/movies/'+ deleteData.id, authConfig())
    .then(res => setRefresh(Date.now()));
  }, [deleteData]);

  useEffect(() => {
    if(null === editData){
      return;
    }
    axios.put('http://localhost:3007/movies/full/'+ editData.id, editData, authConfig())
    .then(res => setRefresh(Date.now()));
  }, [editData])

  return (
    <BrowserRouter>
      <div className="App">
        <MovieContext.Provider value={{
          movies,
          setMovies,
          setData,
          setCreate,
          setDeleteData,
          modalEdit,
          setModalEdit,
          setEditData,
          genre,
          setGenre,
          filterWhat,
          sort,
          setSort,
          rateSort,
          setRateSort,
          listGenre,
          setListGenre,
          cats,
        }}>
        <header className="App-header">
          <nav>
            <NavLink to="/logout" className="nav-link">Logout</NavLink>
            <NavLink to='/category' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Category</NavLink>
            <NavLink to='/admin' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Admin</NavLink>
            <NavLink to='/client' className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Client</NavLink>
          </nav>
          <Routes>
            <Route path='/client' element={<><Create /> </>}></Route>
            <Route path='/admin' element={<><Create /> <New /> </>}></Route>
            <Route path='/category' element={<Cat />}></Route>
            {/* <Route path="/" element={<RequireAuth role="user"><List /></RequireAuth>}></Route>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/logout/" element={<LogoutPage />} />
            <Route path="/client/*" element={<RequireAuth role="admin"><Create /><List /></RequireAuth>}></Route>
            <Route path="/admin/*" element={<RequireAuth role="admin"><Create /><New /><List /></RequireAuth>}></Route> */}
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
