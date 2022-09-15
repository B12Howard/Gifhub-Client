import { useEffect, useState } from 'react';
import usePlaylist from './playlist';
import EditSinglePlaylist from './PlaylistEdit/edit-single-playlist';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';
import './PlaylistEdit/_playlist.scss';
interface Props {
    mode: string;
}

const PlaylistLayout = ({ mode }: Props) => {
    const [displayMode, setDisplayMode] = useState<string>(mode);

    useEffect(() => {
        setDisplayMode(mode);
    }, [mode]);

    const {
        newPlaylist,
        setNewPlaylist,
        addPlaylist,
        playlist,
        setActivePlaylist,
        editPlaylist,
        setEditPlaylist,
        setPlaylistForPlayer,
    } = usePlaylist();

    return (
        <>
            {displayMode === 'list' && (
                <div>
                    <PlaylistEditPresentation
                        setPlaylistForPlayer={setPlaylistForPlayer}
                        playlist={playlist}
                        editPlaylist={editPlaylist}
                        setEditPlaylist={setEditPlaylist}
                        setActivePlaylist={setActivePlaylist}
                        newPlaylist={newPlaylist}
                        setNewPlaylist={setNewPlaylist}
                        addPlaylist={addPlaylist}
                    />
                </div>
            )}
            {displayMode === 'edit' && (
                <div>
                    <EditSinglePlaylist
                        setPlaylistForPlayer={setPlaylistForPlayer}
                        editPlaylist={editPlaylist}
                        setEditPlaylist={setEditPlaylist}
                    />
                </div>
            )}
        </>
    );
};

export default PlaylistLayout;
