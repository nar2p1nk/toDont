import './style/header.css';
import {Link} from 'react-router-dom';
const Header = () =>{
    return(
        <div className="nav">
            <Link className='title' to='/' >To-Don't</Link>
            <div className="navbar">
                <Link className="nav-item Home" to="/">Home</Link>
                <Link className="nav-item Contact" to="/toDont">to-Don't</Link>
                <a className="nav-item About" href='https://github.com/nar2p1nk/'>About</a>
            </div>
        </div>
    )
}

export default Header
