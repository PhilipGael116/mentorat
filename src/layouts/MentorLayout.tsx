import SideBar from '../components/mentor/SideBar'
import { Outlet } from 'react-router-dom'

const MentorLayout = () => {
    return (
        <div className='flex'>
            <img
                src="/hero-blob.svg"
                className="absolute -top-40 -left-70 w-[400px] opacity-15 pointer-events-none select-none"
                alt=""
            />
            <SideBar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default MentorLayout