import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react';
import { db, IFriend, IPlaylist, Record } from '../../db';

const usePlaylist = ({ defaultAge } = { defaultAge: 21 }) => {
    const [name, setName] = useState('');
    const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
    const [newPlaylist, setNewPlaylist] = useState('');
    const [editPlaylist, setEditPlaylist] = useState<IPlaylist | undefined>(undefined);
    const [url, setUrl] = useState('');
    const [age, setAge] = useState(defaultAge);
    const [status, setStatus] = useState('');
    const [activePlaylist, setActivePlaylist] = useState<IPlaylist | undefined>(undefined);

    useEffect(() => {
        db.playlists.orderBy('name').eachPrimaryKey(function (primaryKey) {
            // This callback will be called in the firstName order and provide
            // the primary key of the object it refers to.
        });
    }, []);

    async function addPlaylist(name: string) {
        try {
            const id = await db.playlists.add({
                name,
                record: [],
            });
            setStatus(`Playlist ${name} successfully added.`);
            setPlaylist(undefined);
        } catch (error) {
            setStatus(`Failed to add ${name}: ${error}`);
        }
    }

    async function addGif(playlist: IPlaylist, url: string) {
        try {
            if (!playlist.id) return;
            if (!url) return;

            const record = new Record(url);
            db.playlists
                .where('id')
                .equals(playlist.id)
                .modify((playlist) => (playlist.record ? playlist.record.push(record) : null));
            setUrl('');
        } catch (error) {
            setStatus(`Failed to add ${name}: ${error}`);
        }
    }

    async function deleteFriend(friend: IFriend) {
        try {
            const pk = friend?.id;
            if (!pk) return;
            const res = await db.friends.delete(pk);
            setStatus(`Friend ${name} successfully deleted.`);
        } catch (error) {
            setStatus(`Failed to delete ${friend.name}: ${error}`);
        }
    }

    async function setPlaylistForPlayer(id: number) {
        await db.playlists
            .where('id')
            .equals(id)
            .toArray()
            .then((x) => {
                if (!x.length) return;
                setActivePlaylist(x[0]);
            });
    }

    return {
        setName,
        setAge,
        name,
        age,
        status,
        deleteFriend,
        addPlaylist,
        setPlaylist,
        playlist,
        addGif,
        url,
        setUrl,
        activePlaylist,
        setActivePlaylist,
        editPlaylist,
        setEditPlaylist,
        newPlaylist,
        setNewPlaylist,
        setPlaylistForPlayer,
    };
};

export default usePlaylist;
