import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { IPlaylist } from '../../Models/playlist';
import Button from '../../Shared/Components/button';

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
    return (
        <div className={sidebarClassname ? 'sidebar open-sidebar' : 'sidebar close-sidebar'}>
            <nav>
                <div className="card-panel st-menu-open">
                    <p>Add Playlist</p>
                    <div>
                        <input type="text" value={newPlaylist} onChange={(ev) => setNewPlaylist(ev.target.value)} />
                    </div>
                    <div>
                        <Button name={'Add Playlist'} callback={(val: any) => addPlaylist(newPlaylist)} />
                    </div>
                    <div>
                        <p>Playlists</p>
                    </div>

                    <div className="">
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
