import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Bottombar from '../Navigation/bottombar';
import Topbar from '../Navigation/topbar';
import { GetUserDataByKey } from '../../Services/LocalStorage';
import usePlaylist from '../Playlist/playlist';
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';

const DashboardLayout = () => {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [sidebarClassname, setSidebarClassname] = useState(true);
    // @ts-ignore
    const location = useLocation();
    let socket: WebSocket;

    const { addPlaylist, setPlaylist, setActivePlaylist, setEditPlaylist, newPlaylist, setNewPlaylist } = usePlaylist();

    useEffect(() => {
        const uid = GetUserDataByKey('uid');
        socket = new WebSocket('ws://localhost:5020/ws/' + uid);
        socket.onopen = () => {
            setMessage('Connected');
        };
        socket.onmessage = (e) => {
            setMessage('Get message from server: ' + e.data);
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
    }, [location]);

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
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
                    <pre>Status: {message}</pre>
                    {/* <input id="input" type="text" value={inputValue} onChange={handleChange} readOnly /> */}
                    {/* <button onClick={handleClick}>Send Message To Server</button> */}
                </div>
                <Outlet />
                <div className={'bottombar'}>
                    <Bottombar
                        myPlaylists={myPlaylists}
                        newPlaylist={newPlaylist}
                        setNewPlaylist={setNewPlaylist}
                        addPlaylist={addPlaylist}
                        setEditPlaylist={setEditPlaylist}
                        setActivePlaylist={setActivePlaylist}
                        sidebarClassname={sidebarClassname}
                        setPlaylist={setPlaylist}
                    />
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;
