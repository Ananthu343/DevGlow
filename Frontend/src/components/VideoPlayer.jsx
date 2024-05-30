import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        let currentVideoRef = null;
    
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (currentVideoRef && currentVideoRef.paused) {
                        // Check if the video is ready to play before attempting to play it
                        if (currentVideoRef.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
                            currentVideoRef.play().catch(error => console.error(error));
                        }
                    }
                } else {
                    if (currentVideoRef && !currentVideoRef.paused) {
                        currentVideoRef.pause();
                    }
                }
            },
            { threshold: 0.5 }
        );
    
        if (videoRef.current) {
            observer.observe(videoRef.current);
            currentVideoRef = videoRef.current;
        }
    
        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
            }
        };
    }, []);

    const handleUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
        }
    };

    return (
        <div className='relative w-full h-[200px] md:h-[291px] overflow-hidden'>
            <video ref={videoRef} muted autoPlay style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor:'black'
            }} onClick={handleUnmute} controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired 
};

export default VideoPlayer;
