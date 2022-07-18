import './style/home.css';


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
                    <div className="card"></div>
                    <div className="card"></div>
                    <div className="card"></div>
                </div>
            </div>
        </div>
    )
}

export default Home

