import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Bottombar from '../Navigation/bottombar';
import Topbar from '../Navigation/topbar';
import { Context } from '../../Store/Store';
import PlaylistPresentation from '../Playlist/playlist-presentation';
import { GetUserDataByKey } from '../../Services/LocalStorage';

const DashboardLayout = () => {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    // @ts-ignore
    const location = useLocation();
    let socket: WebSocket;

    useEffect(() => {
        const uid = GetUserDataByKey('uid');
        console.log('my uid ', uid);
        
        socket = new WebSocket('ws://localhost:5020/ws/' + uid);

        console.log('useffect', socket);
        socket.onopen = () => {
            setMessage('Connected');
        };

        socket.onmessage = (e) => {
            setMessage('Get message from server: ' + e.data);
        };

        return () => {
            console.log('close');
            socket.close();
        };
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        console.log('crrent path', currentPath);
    }, [location]);

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            console.log('e', e);
            socket.send(
                JSON.stringify({
                    EventName: 'message',
                    message: inputValue,
                })
            );
        },
        [inputValue]
    );

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <div className={`container`}>
            <Topbar showLinks={true} />
            <div className={`row`}>
                {/* <Sidebar /> */}
                <div className="App">
                    <input id="input" type="text" value={inputValue} onChange={handleChange} />
                    <button onClick={handleClick}>Send</button>
                    <pre>{message}</pre>
                </div>
                <Outlet />
                <div className={' bottombar'}>
                    <Bottombar />
                </div>
                {/* <PlaylistPresentation /> */}
            </div>
        </div>
    );
};
export default DashboardLayout;
