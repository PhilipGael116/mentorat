import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-12 bg-primary'>
            <img
                src="/hero-blob.svg"
                className="absolute -top-40 -left-60 w-[400px] opacity-15 select-none"
                alt=""
            />
            <img src="/undraw_page-not-found_6wni.svg" alt="404 Not Found" />
            <Link to="/" className='text-secondary font-bold'>Back to Home</Link>
        </div>
    )
}

export default NotFound