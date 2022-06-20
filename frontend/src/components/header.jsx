import './style/header.css';

const Header = () =>{
    return(
        <div className="nav">
            <a className='title'>To-Don't</a>
            <div className="navbar">
                <a className="nav-item Home" href="#Home">Home</a>
                <a className="nav-item Contact" href="#Contact">Contact</a>
                <a className="nav-item About" href="#About">About</a>
            </div>
        </div>
    )
}

export default Header
