import {useEffect} from "react";
import './style/home.css';
import {useNavigate} from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem('jwtToken');
        if(token === null){
            navigate('/login')
            return;
        }
    })
    return (
        <div class="homepage">
            <div className='landing div'>
            <div className='landing content'>
            <p className='landing text'>welcome to to-Don't!</p>
                <p className="landing description">
                    Where instead of making a simple todo app for your first project,
                    you make a highly complex glorified "to-Don't" web app with beautiful design.
                </p>
            </div>
            </div>
        </div>
    )
}

export default Home

