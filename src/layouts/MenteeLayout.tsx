import SideBar from '../components/mentee/SideBar'
import MobileMenu from '../components/mentee/MobileMenu'
import { Outlet } from 'react-router-dom'

const MenteeLayout = () => {
    return (
        <div className='flex relative'>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <img
                    src="/hero-blob.svg"
                    className="absolute -top-40 -left-60 w-[400px] opacity-15 select-none"
                    alt=""
                />
            </div>
            <SideBar />
            <div className='flex-1 pb-24 lg:pb-0 min-w-0 relative z-10'>
                <Outlet />
            </div>
            <MobileMenu />
        </div>
    )
}

export default MenteeLayout