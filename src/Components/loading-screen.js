import { useEffect } from 'react';
import NProgress from 'nprogress';

const LoadingScreen = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className="container">
            <div>Loading Gifhub</div>
        </div>
    );
};

export default LoadingScreen;
