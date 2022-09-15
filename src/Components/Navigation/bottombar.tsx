import React from 'react';
import { SideNav, Button } from 'react-materialize';
import { IPlaylist } from '../../Models/playlist';
import { Location } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
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
}

const Bottombar = ({ myPlaylists, setPlaylist, currentLocation }: Props) => {
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
                    <Button node="button" className="">
                        <FontAwesomeIcon icon={faListAlt} />
                    </Button>
                }
            >
                {myPlaylists?.map((playlist: IPlaylist) => (
                    <div
                        onClick={() => {
                            setPlaylist(playlist);
                        }}
                    >
                        <li className={`sidebar-list-item light`}>{playlist.name}</li>
                    </div>
                ))}
            </SideNav>
        );
    };

    const createBottomButton = () => {
        switch (currentLocation?.pathname) {
            case '/home/player':
                return getPlayerButtonAction();

            default:
                return '';
        }
    };

    return (
        <div>
            <div>{createBottomButton()}</div>
        </div>
    );
};
export default Bottombar;
