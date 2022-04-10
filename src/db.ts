import Dexie, { Table } from 'dexie';

export interface IFriend {
    id?: number;
    name: string;
    age: number;
}

export interface IPlaylist {
    id?: number;
    name: string;
    record?: Record[];
}

export interface IRecord {
    id?: number;
    url: string;
    order?: number;
    blob?: Blob;
    duration: number;
    // lastPlayed: Date | null
}
export class Record implements IRecord {
    id?: number;
    url: string;
    order?: number;
    blob?: Blob;
    duration: number;
    constructor(url: string, duration?: number) {
        this.url = url;
        this.duration = duration ?? 2500;
    }
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    friends!: Table<IFriend>;
    playlists!: Table<IPlaylist>;

    constructor() {
        super('myDatabase');
        this.version(2).stores({
            friends: '++id, name, age', // Primary key and indexed props
            playlists: '++id, name',
        });
    }
}

export const db = new MySubClassedDexie();
