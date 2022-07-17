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
            <div className='landing text'><h1>welcome to toDon't</h1></div>
            <div className="landing gimmick">
                <div className="miniApp"></div>
            </div>
        </div>
    )
}

export default Home

