import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bg-white min-h-screen flex flex-col justify-center items-center py-16'>
            {/* <img src={notFoundGif} alt="" /> */}
            <h2 className='text-5xl' style={{height:"70%"}}>Oops Not Found</h2>
            <button className='btn-brand1' style={{height:"20%"}}>
                <Link to="/">BACK TO HOME</Link>
            </button>
        </div>
    );
};

export default NotFound;