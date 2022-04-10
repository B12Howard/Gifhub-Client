import React, { useState } from 'react';
import { IPlaylist } from '../../db';
import 'materialize-css/dist/css/materialize.min.css';

interface Props {
    myPlaylists: IPlaylist[] | undefined;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    sidebarClassname: boolean;
}

const Sidebar = ({
    myPlaylists,
    newPlaylist,
    setNewPlaylist,
    addPlaylist,
    setEditPlaylist,
    setActivePlaylist,
    sidebarClassname,
}: Props) => {
    // let sidebarClassname = this.state.sidebarOpen ? 'sidebar open' : 'sidebar';

    return (
        <div className={sidebarClassname ? 'sidebar open-sidebar' : 'sidebar close-sidebar'}>
            <nav>
                <div className="card-panel teal lighten-2 st-menu-open">
                    <p>Add Playlist</p>
                    <div>
                        <input type="text" value={newPlaylist} onChange={(ev) => setNewPlaylist(ev.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => addPlaylist(newPlaylist)}>Add Playlist</button>
                    </div>
                    <div>
                        <p>Playlists</p>
                    </div>

                    <div className=" teal lighten-2">
                        <ul className="collection">
                            {myPlaylists?.map((playlist: IPlaylist) => (
                                <div key={playlist.id}>
                                    <li
                                        onClick={() => {
                                            setEditPlaylist(undefined);
                                            setActivePlaylist(playlist);
                                        }}
                                    >
                                        {playlist.name}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default Sidebar;
