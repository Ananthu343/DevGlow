import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Adjust import according to your socket.io setup
import PropTypes from 'prop-types'

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    const socket = io("http://localhost:3001");
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    setSocket(socket)
    return ()=>{
      socket.disconnect();
      console.log("disconnected");
    }
  },[])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useSocket = () => {
  return useContext(SocketContext);
};
