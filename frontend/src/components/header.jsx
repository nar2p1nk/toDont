import './style/header.css';
import {Link} from 'react-router-dom';
const Header = () =>{
    return(
        <div className="nav">
            <a className='title' href='#Landing'>To-Don't</a>
            <div className="navbar">
                <Link className="nav-item Home" to="/">Home</Link>
                <a className="nav-item Contact" href="#Contact">Contact</a>
                <a className="nav-item About" href="#About">About</a>
            </div>
        </div>
    )
}

export default Header
