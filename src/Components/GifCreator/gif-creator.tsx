import { useState } from 'react';
import { GetUserDataByKey } from '../../Services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { ConvertPayloadDTO, IConvertPayloadDTO } from '../../Models/ConvertPayload';
import ConvertToGifService from '../../Services/Api/ConverterService';

const GifCreator = () => {
    const [mp4Url, setMp4Url] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');

    let navigate = useNavigate();

    const submit = async () => {
        if (!mp4Url || !start || !end) return;
        const uid = GetUserDataByKey('uid');
        console.log('uid', uid);
        const payload: IConvertPayloadDTO = new ConvertPayloadDTO({
            video: mp4Url,
            start: start,
            end: end,
            wsUserID: uid,
        });
        const res = await ConvertToGifService(payload);
        console.log(res);
    };

    return (
        <>
            <div>
                Gif Creator
                <input
                    id="mp4Url"
                    name="mp4Url"
                    type="text"
                    value={mp4Url}
                    onChange={(ev) => setMp4Url(ev.target.value)}
                />
                <label htmlFor="email">MP4 URL</label>
            </div>
            <div>
                <input id="start" name="start" type="text" value={start} onChange={(ev) => setStart(ev.target.value)} />
                <label htmlFor="start">Clip Start Time</label>
            </div>
            <div>
                <input id="end" name="end" type="text" value={end} onChange={(ev) => setEnd(ev.target.value)} />
                <label htmlFor="end">Clip End Time</label>
            </div>
            <div>
                <button onClick={submit}>Submit</button>
            </div>
        </>
    );
};

export default GifCreator;
