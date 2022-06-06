import { useState } from 'react';
import usePlaylist from './playlist';
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';
import PlayerLayout from '../Player/player-presentation';

const PlaylistPresentation = () => {
    const friends = useLiveQuery(() => db.friends.toArray());
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [sidebarClassname, setSidebarClassname] = useState(true);
    const {
        setName,
        setAge,
        name,
        age,
        status,
        deleteFriend,
        addPlaylist,
        setPlaylist,
        playlist,
        addGif,
        url,
        setUrl,
        activePlaylist,
        setActivePlaylist,
        editPlaylist,
        setEditPlaylist,
        newPlaylist,
        setNewPlaylist,
        setPlaylistForPlayer,
    } = usePlaylist();

    return (
        <>
            <div className={'dashboard-body'}>
                <PlaylistEditPresentation
                    setPlaylistForPlayer={setPlaylistForPlayer}
                    playlist={playlist}
                    editPlaylist={editPlaylist}
                    setEditPlaylist={setEditPlaylist}
                    setActivePlaylist={setActivePlaylist}
                />

                <div>
                    <PlayerLayout
                        activePlaylist={activePlaylist}
                        setEditPlaylist={setEditPlaylist}
                        setActivePlaylist={setActivePlaylist}
                    />
                </div>
            </div>
        </>
    );
};

export default PlaylistPresentation;
