import './style/home.css';
import {FiUser} from 'react-icons/fi'

const Home = () => {
    return (
        <div class="homepage">
            <div className='section landing div'>
            <div className='landing content'>
            <p className='landing text'>welcome to to-Don't!</p>
                <p className="landing description">
                    Where instead of making a simple todo app for your first project,
                    you made a highly complex glorified "to-Don't" web app with beautiful
                    design(i think) as a second big project.
                </p>
                <button className="landing button">Check it out now!</button>
            </div>
            </div>
            <div className="section features div">
                <div className="features content">
                    <div className="card features Flogin">
                        <div className='Flogin-div'>
                        <FiUser className=' Flogin icon'/>
                        </div>
                        <h2>User authentication!</h2>
                        <p className='Flogin-para'>
                            This web app has user authentication(made by me!)!<br/> It uses passportjs with
                            bcrypt encryption and is stored in sqlite.
                        </p>
                        
                    </div>
                    <div className="card features"></div>
                    <div className="card features"></div>
                </div>
            </div>
            <div className="section MTT div">
                <div className="MTT content">
                    <div className="MTT card designer"></div>
                    <div className="MTT card Front-developer"></div>
                    <div className="MTT card back-developer"></div>
                </div>
            </div>
        </div>
    )
}

export default Home

