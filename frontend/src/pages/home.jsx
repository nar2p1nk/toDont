import {useEffect} from "react"
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
            <h1>welcome to toDon't</h1>
        </div>
    )
}

export default Home

