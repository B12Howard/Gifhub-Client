import { useCallback } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import './_navigation.scss';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { LogoutService } from '../../Services/AuthenticationService';

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
                <a className="brand-override" onClick={() => navigate('/home', { replace: true })}>
                    Gifhub
                </a>
            }
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
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
                        onClick={() => navigate('/home/playlist', { replace: true })}
                    >
                        Playlists
                    </NavItem>
                    <NavItem
                        className={`sidebar-list-item`}
                        onClick={() => navigate('/members/gif-creator', { replace: true })}
                    >
                        Gif Creator
                    </NavItem>
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
                        Logout
                    </NavItem>
                </div>
            ) : null}
        </Navbar>
    );
};
export default Topbar;
