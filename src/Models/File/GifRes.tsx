import { SqlDate } from '../Date';

export interface IGifFileRes {
    id?: number;
    url: string;
    createdat: SqlDate | null;
}

export class GifResDTO implements IGifFileRes {
    id?: number;
    url: string = '';
    createdat: SqlDate | null = null;
    constructor(params: Partial<IGifFileRes>) {
        return Object.assign(this, params);
    }
}
