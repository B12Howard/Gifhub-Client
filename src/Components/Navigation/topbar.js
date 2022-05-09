import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import './_navigation.scss';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, NavItem, Icon } from 'react-materialize';

const Topbar = () => {
    const navigate = useNavigate();

    return (
        // <div className={`row`}>
        //     <div className={`mb-3 mr-5`}>
        //         <h2>Gifhub</h2>
        //     </div>
        //     <div>Click 1</div>
        //     <div>Click 2</div>
        //     <div>Click 2</div>
        // </div>

        <Navbar
            alignLinks="right"
            brand={
                <a className="brand-logo" onClick={() => navigate('/home', { replace: true })}>
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
            <NavItem onClick={() => navigate('/home/dashboard', { replace: true })}>Dashboard</NavItem>
            <NavItem onClick={() => navigate('/home/playlist', { replace: true })}>Player</NavItem>
        </Navbar>
    );
};
export default Topbar;
