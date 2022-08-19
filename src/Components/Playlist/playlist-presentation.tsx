import usePlaylist from './playlist';
import PlaylistEditPresentation from './PlaylistEdit/playlist-edit-presentation';

const PlaylistPresentation = () => {
    const { playlist, setActivePlaylist, editPlaylist, setEditPlaylist, setPlaylistForPlayer } = usePlaylist();

    return (
        <>
            <div>
                <PlaylistEditPresentation
                    setPlaylistForPlayer={setPlaylistForPlayer}
                    playlist={playlist}
                    editPlaylist={editPlaylist}
                    setEditPlaylist={setEditPlaylist}
                    setActivePlaylist={setActivePlaylist}
                />
            </div>
        </>
    );
};

export default PlaylistPresentation;
