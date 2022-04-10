import Topbar from './topbar';
import { PlaylistPresentation } from '../Playlist/playlist-presentation';

const DashboardLayout = () => {
    return (
        <div className={`container`}>
            <Topbar />
            <div className={`row`}>
                {/* <Sidebar /> */}
                <div className={'dashboard-body'}>
                    <PlaylistPresentation />
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;
