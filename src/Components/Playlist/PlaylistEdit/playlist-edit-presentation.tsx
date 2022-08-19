import usePlaylistEdit from './playlist-edit';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import PlaylistEditItem from './playlist-edit-item';
import { IPlaylist } from '../../../Models/playlist';
import { IPlaylistRecord } from '../../../Models/record';

interface Props {
    playlist: IPlaylist | undefined;
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
    setActivePlaylist: any;
    setPlaylistForPlayer: any;
}

const PlaylistEditPresentation = ({
    editPlaylist,
    setEditPlaylist,
    setActivePlaylist,
    playlist,
    setPlaylistForPlayer,
}: Props) => {
    const { addGif, url, setUrl, saveOrder, playlistOrder, setPlaylistOrder, deleteRecord, getPlaylists } =
        usePlaylistEdit({
            playlist,
            editPlaylist,
            setEditPlaylist,
        });

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (destination === undefined || destination === null) return null;
        // Make sure we're actually moving the item
        if (destination.index === source.index) return null;
        // Move the item within the list
        // Start by making a new list without the dragged item
        if (!playlistOrder) return;

        const newList = playlistOrder?.filter((_: any, idx: number) => idx !== source.index);
        newList.splice(destination.index, 0, playlistOrder[source.index]);

        setPlaylistOrder(newList);
    };

    const setDuration = (index: number, duration: string) => {
        if (!playlistOrder) {
            return;
        }
        const alteredplaylistOrder: IPlaylistRecord[] | undefined = [...playlistOrder];

        if (playlistOrder) {
            alteredplaylistOrder[index].duration = Number(duration);
            const prop = index;

            if (playlistOrder) {
                setPlaylistOrder(alteredplaylistOrder);
            }
        }
    };

    return (
        <>
            <>
                {getPlaylists()?.map((playlist: IPlaylist) => (
                    <div>
                        <li
                            className={`playlist-list-item`}
                            onClick={() => {
                                setEditPlaylist(playlist);
                                setActivePlaylist(playlist);
                            }}
                        >
                            {playlist.name}
                        </li>
                    </div>
                ))}
            </>

            {editPlaylist && (
                <div>
                    <div>
                        <input type="text" value={url} onChange={(ev) => setUrl(ev.target.value)} />
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                if (!editPlaylist) return;
                                addGif(editPlaylist, url);
                            }}
                        >
                            Add Gif
                        </button>
                        <button
                            onClick={() => {
                                if (!playlistOrder) return;
                                saveOrder(playlistOrder, editPlaylist);
                            }}
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => {
                                setPlaylistForPlayer(editPlaylist.id);
                                setEditPlaylist(undefined);
                            }}
                        >
                            Show Preview
                        </button>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="preview-records">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {playlistOrder?.map((record: IPlaylistRecord, index: number) => (
                                        <>
                                            <PlaylistEditItem
                                                key={index}
                                                record={record}
                                                index={index}
                                                deleteRecord={deleteRecord}
                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                value={playlistOrder[index].duration}
                                                onChange={(e) => setDuration(index, e.target.value)}
                                            ></input>
                                        </>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </>
    );
};

export default PlaylistEditPresentation;
