import { useState } from 'react';

interface Props {
    index: number;
    playLength: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    child: JSX.Element;
}

const Swipe = ({ index, playLength, setIndex, child }: Props) => {
    const [swipeX, setSwipeX] = useState({
        start: 0,
        end: 0,
    });

    const handleTouchStart = (touchStartEvent: React.TouchEvent<HTMLDivElement>) => {
        setSwipeX({ ...swipeX, start: touchStartEvent.changedTouches[0].screenX });
    };
    const handleTouchMove = (touchMoveEvent: React.TouchEvent<HTMLDivElement>) => {};
    const handleTouchEnd = (touchEndEvent: React.TouchEvent<HTMLDivElement>) => {
        setSwipeX({ ...swipeX, end: touchEndEvent.changedTouches[0].screenX });
        if (Math.abs(swipeX.start - touchEndEvent.changedTouches[0].screenX) < 20) {
            return;
        }
        if (swipeX.start > touchEndEvent.changedTouches[0].screenX) {
            // Left swipe
            setIndex(index === playLength - 1 ? 0 : index + 1);
        } else if (swipeX.start < touchEndEvent.changedTouches[0].screenX) {
            // Right swipe
            setIndex(index === 0 ? playLength - 1 : index - 1);
        }
    };

    return (
        <div
            className="slideshow"
            onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
            onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
            onTouchEnd={(touchEndEvent) => handleTouchEnd(touchEndEvent)}
        >
            {child}
        </div>
    );
};

export default Swipe;
