import { IGifFileRes } from '../../Models/File/GifRes';
import { IPaginationDTO } from '../../Models/Pagination';
import Domain from './Domain';

/**
 * Returns a Promise
 *
 * @param {string} link The user's input url
 * @return {Promise}
 */
export default class FileService {
    public headers = {};
    public userEndpoint = '';

    constructor() {
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
        this.userEndpoint = 'getUser/getGifs';
    }

    GetGifsPagination(payload: IPaginationDTO<IGifFileRes>) {
        console.log('ConvertToGifService', payload);
        const options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        };
        return fetch(Domain() + this.userEndpoint, options);
    }
}
