import './App.css';
import './components/header.jsx';
import Header from './components/header';
import Main from './pages/main';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/todont' element={<Main/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
