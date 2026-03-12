import SideBar from '../components/mentee/SideBar'
import MobileMenu from '../components/mentee/MobileMenu'
import { Outlet } from 'react-router-dom'

const MenteeLayout = () => {
    return (
        <div className='flex'>
            <img
                src="/hero-blob.svg"
                className="absolute -top-40 -left-70 w-[400px] opacity-15 pointer-events-none select-none"
                alt=""
            />
            <SideBar />
            <div className='flex-1 pb-24 lg:pb-0'>
                <Outlet />
            </div>
            <MobileMenu />
        </div>
    )
}

export default MenteeLayout