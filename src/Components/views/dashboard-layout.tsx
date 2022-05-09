import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Bottombar from '../Navigation/bottombar';
import Topbar from '../Navigation/topbar';
import PlaylistPresentation from '../Playlist/playlist-presentation';

const DashboardLayout = () => {
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname;
        console.log('crrent path', currentPath);
    }, [location]);

    return (
        <div className={`container`}>
            <Topbar />
            <div className={`row`}>
                {/* <Sidebar /> */}
                <Outlet />
                {/* <PlaylistPresentation /> */}
            </div>
        </div>
    );
};
export default DashboardLayout;
