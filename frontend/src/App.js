import './App.css';
import './components/header.jsx';
import Header from './components/header.jsx';
import Main from './pages/main';
function App() {
  return (
    <div className="App">
      < Header />
      <Main/>
    </div>
  );
}

export default App;
