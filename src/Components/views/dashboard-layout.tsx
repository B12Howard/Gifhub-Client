import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import loginBg from '../../Assets/antenna-jqh0GEvuNBY-unsplash-min.jpeg';
import playerBg from '../../Assets/barna-kovacs-vfAguUFUIgo-unsplash-min.jpeg';
import myUploadsBg from '../../Assets/iwan-shimko-PhciG8fpRKw-unsplash-min.jpeg';
import creatorBg from '../../Assets/rochelle-lee-6LscnhGdFsw-unsplash-min.jpeg';
import playlistBg from '../../Assets/rochelle-lee-uqa8vZROxkY-unsplash-min.jpeg';

const DashboardLayout = () => {
    const [message, setMessage] = useState('');
    const [bgUrl, setBgUrl] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [sidebarClassname, setSidebarClassname] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>();
    // @ts-ignore
    const location = useLocation<Location>();
    const { addPlaylist, setPlaylist, setActivePlaylist, setEditPlaylist, newPlaylist, setNewPlaylist } = usePlaylist();

    useLayoutEffect(() => {
        const path = location.pathname;

        switch (path) {
            case '/home/player':
                setBgUrl(playerBg);
                break;
            case '/home/dashboard':
                setBgUrl(loginBg);
                break;
            case '/home/playlists':
                setBgUrl(playlistBg);
                break;
            case '/members/gif-creator':
                setBgUrl(creatorBg);
                break;
            case '/members/my-uploads':
                setBgUrl(myUploadsBg);
                break;

            default:
                setBgUrl(loginBg);
        }
        // };
    }, [location]);

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
        <div
            className={`container`}
            id={`main-container`}
            style={{
                backgroundImage: `linear-gradient(to top right, rgba(246, 241, 237, 0.95) 10%, rgba(255, 242, 232, 0.95)), url('${bgUrl}')`,
            }}
        >
            <Topbar showLinks={true} />
            <div className={`row`}>
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
