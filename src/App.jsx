import './App.css';
import Create from './Components/Create';
import List from './Components/List';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
