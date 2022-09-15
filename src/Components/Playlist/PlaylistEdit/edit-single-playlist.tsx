import { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { IPlaylist } from '../../../Models/playlist';
import { IPlaylistRecord } from '../../../Models/record';
import usePlaylistEdit from './playlist-edit';
import PlaylistEditItem from './playlist-edit-item';

interface Props {
    editPlaylist: IPlaylist | undefined;
    setEditPlaylist: any;
    setPlaylistForPlayer: any;
}

const EditSinglePlaylist = ({ editPlaylist, setEditPlaylist, setPlaylistForPlayer }: Props) => {
    const { addGif, url, setUrl, saveOrder, playlistOrder, setPlaylistOrder, deleteRecord, getPlaylists } =
        usePlaylistEdit({
            editPlaylist,
            setEditPlaylist,
        });
    const navigate = useNavigate();
    const redirect = useCallback(
        (path) => {
            navigate(path);
        },
        [navigate]
    );

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

    return (
        <div>
            <div
                onClick={() => {
                    navigate(`/home/playlists`, { replace: true });
                }}
            >
                Back
            </div>

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
        </div>
    );
};

export default EditSinglePlaylist;
