import './style/header.css';

const Header = () =>{
    return(
        <div className="nav">
            <h2 className='title'>To-Don't</h2>
            <ul className='nav-list'>
                        
                    <li className="nav-item Home">
                        <p>
                        <a href='#Home' className='nav-link Home'>
                            Home
                        </a>
                        </p>
                    </li>
                        
                    <li className="nav-item Main">
                        <p>
                        <a href='#Main' className='nav-link Main'>
                            Main
                        </a>
                        </p>
                    </li>
                <li className="nav-item About">
                    
                    <a href='#About' className='nav-link About'>
                    <p>
                    About
                    </p>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Header
