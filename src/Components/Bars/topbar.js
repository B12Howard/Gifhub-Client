import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './_bars.scss';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { LogoutService } from '../../Services/AuthenticationService';
import { GetUserToken } from '../../Services/LocalStorage';

const Topbar = ({ showLinks }) => {
    const navigate = useNavigate();

    const redirect = useCallback(
        (path) => {
            navigate(path, { replace: false });
        },
        [navigate]
    );
    return (
        <Navbar
            className={'nav-override'}
            alignLinks="right"
            brand={
                <a className="brand-override" onClick={() => navigate('/home/dashboard', { replace: false })}>
                    <span className={`text-2`}>GifHub</span>
                </a>
            }
            id="mobile-nav"
            menuIcon={<Icon className={`burger`}>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 50,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 50,
                preventScrolling: true,
            }}
        >
            <div className={'flex column'}>
                <NavItem
                    className={`sidebar-list-item`}
                    onClick={() => navigate('/home/dashboard', { replace: false })}
                >
                    Dashboard
                </NavItem>
                <NavItem className={`sidebar-list-item`} onClick={() => navigate('/home/player', { replace: false })}>
                    Player
                </NavItem>
                <NavItem
                    className={`sidebar-list-item`}
                    onClick={() => navigate('/home/playlists', { replace: false })}
                >
                    Playlists
                </NavItem>
                {GetUserToken() && (
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/members/gif-creator', { replace: false })}
                    >
                        Gif Creator
                    </NavItem>
                )}
                {GetUserToken() && (
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/members/my-uploads', { replace: false })}
                    >
                        My Uploads
                    </NavItem>
                )}
                <NavItem
                    className={`sidebar-list-item`}
                    onClick={() => {
                        LogoutService();
                        redirect('/auth/login');
                    }}
                >
                    {GetUserToken() ? 'Logout' : 'Login'}
                </NavItem>
            </div>
        </Navbar>
    );
};
export default Topbar;
