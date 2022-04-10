import React, { useEffect, useState } from 'react';
import { IRecord } from '../../../db';
import { Draggable } from 'react-beautiful-dnd';
interface Props {
    record: IRecord;
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
                        <img className="edit-preview" src={record.url} alt="loading..." />
                        <button onClick={() => deleteRecord(index)}>X</button>
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default PlaylistEditItem;
