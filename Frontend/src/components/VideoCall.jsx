import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function VideoCall({ roomId }) {
  const { userInfo } = useSelector(state => state.auth);
  const videoRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const appId = 774738530;
    const serverSecret = "77d46e049edc7b3feb1740b6e79250d8";
    let zc = null;

    const joinRoom = async (element) => {
      const roomID = roomId;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId, serverSecret, roomID, userInfo.devGlowAccess._id, userInfo.devGlowAccess.username
      );
      zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        screenSharingConfig: false,
        showPreJoinView: false,
        onLeaveRoom: () => {
          navigate('/messages')
        }
      });
    };

    joinRoom(videoRef.current);

    return () => {
      if (zc) {
        zc.destroy();
      }
    };
  }, [roomId, userInfo, navigate]);


  return (
    <div>
      {/* Video Call Container */}
      <div className='h-[80%]' ref={videoRef}></div>
    </div>
  );
}
