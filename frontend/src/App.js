import './App.css';
import './components/header.jsx';
import Header from './components/header.jsx';
import Main from './pages/main';
import Login from './pages/login'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/app' element=''/>
        <Route path='/about'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
