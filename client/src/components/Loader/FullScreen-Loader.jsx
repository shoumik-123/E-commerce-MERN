import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import {useSelector} from "react-redux";

const FullScreenLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress + 1) % 100);
        }, 100);

        return () => clearInterval(interval);
    }, []);


    // redux use
    const loader = useSelector((state)=> state.settings.loader)   //redux



    return (
        <div>
            <div className={loader}>
                <LoadingBar
                    color="#FDD138"
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                    // className={fullscreen-loader}
                />
                <div className="overlay">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
