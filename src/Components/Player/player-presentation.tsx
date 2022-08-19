import { useEffect, useState, useContext } from 'react';
import './_player.scss';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { IPlaylist } from '../../Models/playlist';
import { Context } from '../../Store/Store';

SwiperCore.use([EffectCoverflow, Pagination]);

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}

const slide_img = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
    'https://swiperjs.com/demos/images/nature-7.jpg',
    'https://swiperjs.com/demos/images/nature-8.jpg',
    'https://swiperjs.com/demos/images/nature-9.jpg',
];

const PlayerPresentation = () => {
    // @ts-ignore
    const [context, dispatch] = useContext(Context);
    const [presentationActivePlaylist, setPresentationActivePlaylist] = useState<any>(null);

    useEffect(() => {
        if (context?.activePlaylist !== null && context?.activePlaylist !== undefined) {
            setPresentationActivePlaylist(context.activePlaylist.playlist);
        }
    }, [context?.activePlaylist]);

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
            >
                {presentationActivePlaylist &&
                    presentationActivePlaylist?.record?.map((record: any, i: number) => {
                        return (
                            <SwiperSlide key={i}>
                                <img
                                    className={`gif-player-image`}
                                    src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                                    alt=""
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};
export default PlayerPresentation;
