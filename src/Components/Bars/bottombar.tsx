import React, { useEffect, useState } from 'react';
import { SideNav, Button } from 'react-materialize';
import { IPlaylist } from '../../Models/playlist';
import { Location } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import './_bars.scss';
interface Props {
    myPlaylists: IPlaylist[] | undefined;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    sidebarClassname: boolean;
    currentLocation: Location | null;
    playlist: IPlaylist | undefined;
    setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    closeSidebar: boolean;
}

const Bottombar = ({ myPlaylists, setPlaylist, currentLocation, playlist, setCloseSidebar, closeSidebar }: Props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [hideBottomBar, setHideBottomBar] = useState<boolean>(false);

    useEffect(() => {
        switch (currentLocation?.pathname) {
            case '/home/player':
                setHideBottomBar(false);
                console.log('hideBottomBar', hideBottomBar);
                break;

            default:
                setHideBottomBar(true);
                break;
        }
    }, [currentLocation]);

    const getPlayerButtonAction = () => {
        return (
            <SideNav
                className={`side-nav`}
                id="SideNav-31"
                options={{
                    edge: 'right',
                    draggable: true,
                }}
                trigger={
                    <div>
                        <Button
                            node="button"
                            className="control-button"
                            onClick={() => {
                                setOpened(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faListAlt} />
                        </Button>
                    </div>
                }
            >
                {<span className={`text-1`}>My Playlists</span>}
                {myPlaylists?.map((playlist: IPlaylist, index: number) => (
                    <div
                        onClick={() => {
                            setOpened(false);
                            setPlaylist(playlist);
                        }}
                    >
                        <li key={index} className={`sidebar-list-item light`}>
                            {playlist.name}
                        </li>
                    </div>
                ))}
            </SideNav>
        );
    };

    return !hideBottomBar ? (
        <div className={`action-button-container`}>
            <div className={`open-button`} style={{ zIndex: `${!opened ? 15000 : 14000}` }}>
                {getPlayerButtonAction()}
            </div>

            <div className={`close-button`} style={{ zIndex: `${opened ? 15000 : 14000}` }}>
                <Button
                    className="close-control-button"
                    onClick={(e: any) => {
                        console.log('scrap');

                        setOpened(false);

                        setCloseSidebar(!closeSidebar);
                    }}
                >
                    <FontAwesomeIcon icon={faListAlt} />
                </Button>
            </div>
        </div>
    ) : (
        <div></div>
    );
};
export default Bottombar;
