import React from 'react';
import { SideNav, Button } from 'react-materialize';
import { IPlaylist } from '../../Models/playlist';

interface Props {
    myPlaylists: IPlaylist[] | undefined;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    sidebarClassname: boolean;
}

const Bottombar = ({ myPlaylists, setPlaylist }: Props) => {
    return (
        <div>
            <div>
                <SideNav
                    className={`side-nav`}
                    id="SideNav-31"
                    options={{
                        edge: 'right',
                        draggable: true,
                    }}
                    trigger={
                        <Button node="button" className="">
                            ☰
                        </Button>
                    }
                >
                    {myPlaylists?.map((playlist: IPlaylist) => (
                        <div
                            onClick={() => {
                                setPlaylist(playlist);
                            }}
                        >
                            <li className={`sidebar-list-item`}>{playlist.name}</li>
                        </div>
                    ))}
                </SideNav>
            </div>
        </div>
    );
};
export default Bottombar;
