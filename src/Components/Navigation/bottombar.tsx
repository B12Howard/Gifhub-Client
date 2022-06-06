import React, { useState } from 'react';
import { IPlaylist } from '../../db';
import Button from '../../Shared/Components/button';

interface Props {
    // myPlaylists: IPlaylist[] | undefined;
    // newPlaylist: string;
    // setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    // addPlaylist: any;
    // setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    // setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    // sidebarClassname: boolean;
}

const Bottombar = ({}: Props) => {
    const handlePlaylistSelection = (selection: any) => {};

    return (
        <div>
            <div>
                <Button name={'Playlists'} callback={(val: any) => handlePlaylistSelection(val)} />
            </div>
        </div>
    );
};
export default Bottombar;
