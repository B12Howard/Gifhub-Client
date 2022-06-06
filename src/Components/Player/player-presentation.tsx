import React, { useEffect, useState } from 'react';
import { IPlaylist } from '../../db';
import Button from '../../Shared/Components/button';
import Swipe from '../../Shared/Components/Touch/swipe';
import usePlayer from './player';
import PlayerItem from './player-item';
import './_player.scss';

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}

const PlayerLayout = ({ activePlaylist, setActivePlaylist, setEditPlaylist }: Props) => {
    const {
        timeoutRef,
        index,
        setIndex,
        playlist,
        setPlaylist,
        playLength,
        setPlayLength,
        delay,
        setDelay,
        autoPlay,
        setAutoPlay,
        stopAutoPlay,
        toggleEdit,
        resetTimeout,
        defaultDuration,
    } = usePlayer({ activePlaylist, setActivePlaylist, setEditPlaylist });

    return (
        <div className="slideshow-container">
            <div>
                <Button name={'Edit Playlist'} callback={(val: any) => toggleEdit()} />
                <Button name={'Stop Autoplay'} callback={(val: any) => stopAutoPlay()} />
            </div>
            <Swipe
                index={index}
                playLength={playLength}
                setIndex={setIndex}
                child={
                    <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                        {playlist?.record?.map((record, index) => (
                            <div className="slide" key={index}>
                                <PlayerItem record={record} />
                            </div>
                        ))}
                    </div>
                }
            ></Swipe>

            <div className="slideshowDots">
                {playlist?.record?.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? ' active' : ''}`}
                        onClick={() => {
                            setDelay(playlist?.record ? playlist?.record[idx]?.duration * 1000 : defaultDuration);
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default PlayerLayout;
