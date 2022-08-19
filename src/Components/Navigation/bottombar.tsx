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
            <div className={`flex`}>
                <div>
                    <SideNav
                        id="SideNav-31"
                        options={{
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
                                <li>{playlist.name}</li>
                            </div>
                        ))}
                    </SideNav>
                </div>
            </div>
        </div>
    );
};
export default Bottombar;
