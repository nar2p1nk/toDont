import './style/header.css';

const Header = () =>{
    return(
        <div className="nav">
            <h2 className='title'>To-Don't</h2>
            <ul className='nav-list'>
                    <li className="nav-item Home">
                        <a href='#Home' className='nav-link Home'>
                            Home
                        </a>
                    </li>
                    <li className="nav-item Main">
                        <a href='#Main' className='nav-link Main'>
                            Main
                        </a>
                    </li>
                <li className="nav-item About">
                    <a href='#About' className='nav-link About'>
                    About
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Header
