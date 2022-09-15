import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './_navigation.scss';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { LogoutService } from '../../Services/AuthenticationService';
import { GetUserToken } from '../../Services/LocalStorage';

const Topbar = ({ showLinks }) => {
    const navigate = useNavigate();

    const redirect = useCallback(
        (path) => {
            navigate(path);
        },
        [navigate]
    );
    return (
        <Navbar
            className={'nav-override'}
            alignLinks="right"
            brand={
                <a className="brand-override" onClick={() => navigate('/home/dashboard', { replace: true })}>
                    Gifhub
                </a>
            }
            id="mobile-nav"
            menuIcon={<Icon className={`burger`}>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true,
            }}
        >
            {showLinks ? (
                <div className={'flex column'}>
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/home/dashboard', { replace: true })}
                    >
                        Dashboard
                    </NavItem>
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/home/player', { replace: true })}
                    >
                        Player
                    </NavItem>
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/home/playlists', { replace: true })}
                    >
                        Playlists
                    </NavItem>
                    {GetUserToken() && (
                        <NavItem
                            className={`sidebar-list-item`}
                            onClick={() => navigate('/members/gif-creator', { replace: true })}
                        >
                            Gif Creator
                        </NavItem>
                    )}
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/members/my-uploads', { replace: true })}
                    >
                        My Uploads
                    </NavItem>
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
            ) : null}
        </Navbar>
    );
};
export default Topbar;
