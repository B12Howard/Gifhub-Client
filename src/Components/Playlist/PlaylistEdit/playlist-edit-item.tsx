import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IPlaylistRecord } from '../../../Models/record';
interface Props {
    record: IPlaylistRecord;
    index: number;
    deleteRecord: any;
}

const PlaylistEditItem = ({ record, index, deleteRecord }: Props) => {
    return (
        <Draggable draggableId={record.id + '' + index} index={index}>
            {(provided) => (
                <>
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <span>{record.url}</span>
                        <img
                            className="edit-preview"
                            src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                            alt="loading..."
                        />
                        <button onClick={() => deleteRecord(index)}>X</button>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default PlaylistEditItem;
