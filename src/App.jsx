import { useEffect, useState } from 'react';
import './App.css';
import Create from './Components/Client/Create';
import List from './Components/Client/List.jsx';
import axios from 'axios';
import MovieContext from './Contexts/MovieContext';
import New from './Components/Admin/New';
import Edit from './Components/Admin/Edit';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRef } from 'react';
import { authConfig,  } from './Functions/auth';
import { RequireAuth, LoginPage, LogoutPage } from './Components/Auth/Auth';
import Cat from './Components/Cat/Cat';
import ListA from './Components/Admin/ListA.jsx';
import Nav from './Components/Nav';

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
  const [roleChange, setRoleChange] = useState(Date.now());

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
  }, []);

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
          <ShowNav roleChange={roleChange} />
          <Routes>
            <Route path='/client' element={<RequireAuth role='user'><Create /> <List /></RequireAuth>}></Route>
            <Route path="/login" element={<LoginPage setRoleChange={setRoleChange} />} />
            <Route path="/logout" element={<LogoutPage setRoleChange={setRoleChange} />} />
            <Route path="/category" element={<RequireAuth role="admin"><Cat /></RequireAuth>}></Route>
            <Route path="/admin" element={<RequireAuth role="admin"><Create /> <New /> <ListA /></RequireAuth>}></Route>
          </Routes>     
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

function ShowNav({roleChange}) {
  const [status, setStatus] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:3007/login-check?role=admin', authConfig())
      .then(res => {
        setStatus(res.data.status);
      })
  }, [roleChange]);
  return <Nav status={status} />
}

export default App;
