import { IRecord } from '../../db';

interface Props {
    record: IRecord;
}

const PlayerItem = ({ record }: Props) => {
    const createImage = (record: IRecord): string => {
        let reader = new FileReader();
        if (!record?.blob) return record.url;
        const blobUrl = URL.createObjectURL(record?.blob);

        return blobUrl;
    };

    return (
        <div>
            <img
                className={'player-item'}
                src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                alt="loading..."
            />
        </div>
    );
};

export default PlayerItem;
