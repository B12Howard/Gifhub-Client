import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IPlaylistRecord } from '../../../Models/record';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

interface Props {
    record: IPlaylistRecord;
    index: number;
    deleteRecord: any;
    playlistOrder: IPlaylistRecord[];
    setDuration: any;
}

const PlaylistEditItem = ({ record, index, deleteRecord, playlistOrder, setDuration }: Props) => {
    return (
        <Draggable draggableId={record.id + '' + index} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={`flex`}>
                        <img
                            className="edit-preview"
                            src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                            alt="loading..."
                        />
                        {/* TODO add modal to delete */}
                        <button className={`delete-image`} onClick={() => deleteRecord(index)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                    <div>{record.url}</div>

                    <span className={`label`}>Duration (seconds)</span>
                    <input
                        className={`seconds-input`}
                        type="number"
                        min="0"
                        value={playlistOrder[index].duration}
                        onChange={(e) => setDuration(index, e.target.value)}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default PlaylistEditItem;
