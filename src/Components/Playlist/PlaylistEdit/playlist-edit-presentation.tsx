import usePlaylistEdit from './playlist-edit';
import { IPlaylist } from '../../../Models/playlist';
import Button from '../../../Shared/Components/button';
import { useNavigate } from 'react-router-dom';
import './_playlist.scss';

interface Props {
    playlist: IPlaylist | undefined;
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
    setActivePlaylist: any;
    setPlaylistForPlayer: any;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
}

const PlaylistEditPresentation = ({
    editPlaylist,
    setEditPlaylist,
    setActivePlaylist,
    playlist,
    setPlaylistForPlayer,
    newPlaylist,
    setNewPlaylist,
    addPlaylist,
}: Props) => {
    const navigate = useNavigate();

    const { addGif, url, setUrl, saveOrder, playlistOrder, setPlaylistOrder, deleteRecord, getPlaylists } =
        usePlaylistEdit({
            editPlaylist,
            setEditPlaylist,
        });

    return (
        <>
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

            <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Images</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getPlaylists()
                            ?.filter((playlist: IPlaylist) => playlist.name)
                            ?.map((playlist: IPlaylist, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td
                                            className={`playlist-list-item`}
                                            onClick={() => {
                                                setEditPlaylist(playlist);
                                                setActivePlaylist(playlist);
                                                navigate(`/home/playlist/${playlist.id}/edit`, {
                                                    replace: true,
                                                });
                                            }}
                                        >
                                            <span>{playlist.name}</span>
                                        </td>
                                        <td>{playlist.record?.length}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
        </>
    );
};

export default PlaylistEditPresentation;
