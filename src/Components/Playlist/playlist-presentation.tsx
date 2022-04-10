import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import usePlaylist from './playlist';
import { db, IFriend, IPlaylist, IRecord } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';
import PlaylistPreviewPresentation from './PlaylistPreview/playlist-preview-presentation';
import PlayerLayout from '../Player/player-presentation';
import Sidebar from '../views/sidebar';

export const PlaylistPresentation = () => {
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
            {/* <p>{status}</p> */}

            <Sidebar
                newPlaylist={newPlaylist}
                myPlaylists={myPlaylists}
                setNewPlaylist={setNewPlaylist}
                addPlaylist={addPlaylist}
                setEditPlaylist={setEditPlaylist}
                setActivePlaylist={setActivePlaylist}
                sidebarClassname={sidebarClassname}
            />

            {/* <PlaylistPreviewPresentation
                activePlaylist={activePlaylist}
                setActivePlaylist={setActivePlaylist}
                setEditPlaylist={setEditPlaylist}
            /> */}

            <PlaylistEditPresentation
                setPlaylistForPlayer={setPlaylistForPlayer}
                playlist={playlist}
                editPlaylist={editPlaylist}
                setEditPlaylist={setEditPlaylist}
                setActivePlaylist={setActivePlaylist}
            />

            <div>
                <button
                    onClick={() => {
                        setSidebarClassname(!sidebarClassname);
                    }}
                    data-effect="st-effect-1"
                >
                    Sidebar
                </button>
                <PlayerLayout
                    activePlaylist={activePlaylist}
                    setEditPlaylist={setEditPlaylist}
                    setActivePlaylist={setActivePlaylist}
                />
            </div>
        </>
    );
};
