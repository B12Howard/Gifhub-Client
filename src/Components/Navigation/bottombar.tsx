import React, { useState } from 'react';
import { IPlaylist } from '../../db';
import 'materialize-css/dist/css/materialize.min.css';
import { Button, Icon } from 'react-materialize';

interface Props {
    myPlaylists: IPlaylist[] | undefined;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    sidebarClassname: boolean;
}

const Bottombar = ({
    myPlaylists,
    newPlaylist,
    setNewPlaylist,
    addPlaylist,
    setEditPlaylist,
    setActivePlaylist,
    sidebarClassname,
}: Props) => {
    // let sidebarClassname = this.state.sidebarOpen ? 'sidebar open' : 'sidebar';

    return (
        <div>
            <Button
                className="red"
                style={{
                    width: '8.5rem',
                    height: '4rem',
                    borderRadius: '10%',
                }}
                floating
                icon={'My Playlists'}
                large
                node="button"
                waves="light"
                onClick={() => console.log('override')}
            />
        </div>
    );
};
export default Bottombar;
