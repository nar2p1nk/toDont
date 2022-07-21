import './style/header.css';
import {Link} from 'react-router-dom';
const Header = () =>{
    return(
        <div className="nav">
            <a className='title' href='#Landing'>To-Don't</a>
            <div className="navbar">
                <Link className="nav-item Home" to="/">Home</Link>
                <Link className="nav-item Contact" to="/to-Don't">to-Don't</Link>
                <Link className="nav-item About" to="/About">About</Link>
            </div>
        </div>
    )
}

export default Header
