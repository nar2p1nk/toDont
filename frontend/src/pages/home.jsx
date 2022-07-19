import './style/home.css';
import {FiUser,FiLayers,FiHeadphones} from 'react-icons/fi';

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
                        <div className='icon-div'>
                        <FiUser className=' Flogin icon'/>
                        </div>
                        <h2>User authentication!</h2>
                        <p className='Flogin Fpara'>
                            This web app has user authentication(made by me!)!<br/> It uses passportjs with
                            bcrypt encryption and is stored in sqlite. It also has redirects users
                            that are not logged in, try clicking that to-Don't button up there or Dont.
                        </p>
                        
                    </div>
                    <div className="card features Ffullstack">
                        <div className='icon-div'>
                            <FiLayers className='Ffullstack icon'/>
                        </div>
                        <h2>Fullstack!</h2>
                        <p className="Ffullstack Fpara">
                            This is a fullstack web app meaning that i(yes me) made both the backend and
                            the frontend, the backend uses a framework called express to handle all the
                            requests while frontend is handled by react.
                        </p>
                    </div>
                    <div className="card features Fme">
                        <div className="icon-div">
                            <FiHeadphones className='Fme icon' />
                        </div>
                        <h2>Made by me!</h2>
                        <p className="Fme Fpara">
                            Incase you didn't notice, this super-duper hard web app to make was made by me,
                            but i would also like to thank myself for helping me make this web app
                            (made by me), without me this wouldn't be possible.
                        </p>
                    </div>
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

