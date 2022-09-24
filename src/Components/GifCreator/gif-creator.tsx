import { useState } from 'react';
import { GetUserDataByKey } from '../../Services/LocalStorage';
import { ConvertPayloadDTO, IConvertPayloadDTO } from '../../Models/ConvertPayload';
import ConvertToGifService from '../../Services/Api/ConverterService';
import Button from '../../Shared/Components/ButtonType1/button';
// @ts-ignore
import { toast } from 'materialize-css/dist/js/materialize.min.js';
import InputMask, { BeforeMaskedStateChangeStates } from 'react-input-mask';

const GifCreator = () => {
    const [mp4Url, setMp4Url] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');

    const submit = async () => {
        if (!mp4Url || !start || !end) return;

        // TODO check clip time vs how much they are allowed per membership number

        const uid = GetUserDataByKey('uid');
        const payload: IConvertPayloadDTO = new ConvertPayloadDTO({
            video: mp4Url,
            start: start,
            end: end,
            wsUserID: uid,
        });
        const res = await ConvertToGifService(payload);

        // TODO parse json for message
        const message = await res.json();
        toast({ html: res.statusText, displayLength: 3000 });
    };

    const validateDuration = () => {
        // Length of the clip depends on the user type. Verify with server that the user is within bounds of the user type
    };

    const beforeMaskedStateChange = (newState: BeforeMaskedStateChangeStates) => {
        var value = newState.nextState.value;
        var selection = newState.nextState.selection;
        // var cursorPosition = selection ? selection.start : null;

        // // keep minus if entered by user
        // if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
        //   if (cursorPosition === value.length) {
        //     cursorPosition--;
        //     selection = { start: cursorPosition, end: cursorPosition };
        //   }
        //   value = value.slice(0, -1);
        // }

        return {
            value,
            selection,
        };
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
                <InputMask
                    mask="99:99:99"
                    value={start}
                    onChange={(ev) => setStart(ev.target.value)}
                    beforeMaskedStateChange={(states: BeforeMaskedStateChangeStates) => beforeMaskedStateChange(states)}
                />
                {/* <input id="start" name="start" type="text" value={start} onChange={(ev) => setStart(ev.target.value)} /> */}
                <label htmlFor="start">Clip Start Time</label>
            </div>
            <div>
                <InputMask mask="99:99:99" value={end} onChange={(ev) => setEnd(ev.target.value)} />

                <label htmlFor="end">Clip End Time</label>
            </div>
            <div>
                <Button name={'Submit'} callback={(val: any) => submit()} />
            </div>
        </>
    );
};

export default GifCreator;
