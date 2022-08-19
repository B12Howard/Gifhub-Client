import usePlaylist from './playlist';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';

const PlaylistPresentation = () => {
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
        </>
    );
};

export default PlaylistPresentation;
