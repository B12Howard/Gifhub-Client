import React, { FC, useEffect, useState } from 'react';
import { IPlaylist, IRecord } from '../../../db';

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}
const PlaylistPreviewPresentation = ({ activePlaylist, setActivePlaylist, setEditPlaylist }: Props) => {
    const toggleEdit = () => {
        setEditPlaylist(activePlaylist);
        setActivePlaylist(undefined);
    };
    useEffect(() => {}, []);

    if (activePlaylist) {
        return (
            <div>
                {/* <div>Player</div> */}
                <div>
                    <button onClick={() => toggleEdit()}>Edit Playlist</button>
                </div>
                {/* <div>
                    {activePlaylist?.record?.map((record: IRecord, index: number) => (
                        <PlayerItem key={index} record={record} />
                    ))}
                </div> */}
            </div>
        );
    } else {
        return <></>;
    }
};

export default PlaylistPreviewPresentation;
