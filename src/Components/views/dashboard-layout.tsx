import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Bottombar from '../Navigation/bottombar';
import Topbar from '../Navigation/topbar';
import { GetUserDataByKey } from '../../Services/LocalStorage';
import usePlaylist from '../Playlist/playlist';
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Location } from 'history';
// @ts-ignore
import M from 'materialize-css/dist/js/materialize.min.js';

const DashboardLayout = () => {
    const [message, setMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [sidebarClassname, setSidebarClassname] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>();
    // @ts-ignore
    const location = useLocation<Location>();
    const { addPlaylist, setPlaylist, setActivePlaylist, setEditPlaylist, newPlaylist, setNewPlaylist } = usePlaylist();

    useEffect(() => {
        const uid = GetUserDataByKey('uid');
        setSocket(new WebSocket('ws://localhost:5020/ws/' + uid));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.onopen = () => {
            setMessage('Connected');
        };
        socket.onmessage = (e) => {
            const parsed = JSON.parse(e.data);
            setMessage('Get message from server: ' + e.data);
            M.toast({ html: parsed.eventPayload.username + ': ' + parsed.eventPayload.message, displayLength: 3000 });
        };

        return () => {
            socket.close();
        };
    }, [socket]);

    useEffect(() => {
        setCurrentLocation(location);
    }, [location]);

    const sendMessage = useCallback(
        (e) => {
            e.preventDefault();

            if (!socket) return;

            socket.send(
                JSON.stringify({
                    EventName: 'message',
                    EventPayload: { message: inputValue, userID: GetUserDataByKey('uid') },
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
                <div className="App">
                    {/* <pre>Status: {message}</pre>
                    <input id="input" type="text" value={inputValue} onChange={handleChange} />
                    <button onClick={sendMessage}>Send Message To Server</button> */}
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
                        currentLocation={currentLocation}
                    />
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;
