import { IConvertPayloadDTO } from '../../Models/ConvertPayload';
import Domain from './Domain';

/**
 * Returns a Promise
 *
 * @param {string} link The user's input url
 * @return {Promise}
 */
export default function ConvertToGifService(payload: IConvertPayloadDTO) {
    const token = localStorage.getItem('token');
    console.log('ConvertToGifService', payload);
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
    };
    return fetch(Domain() + 'converter', options);
}
