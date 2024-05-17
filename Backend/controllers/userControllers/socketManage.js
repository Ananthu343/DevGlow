import MessageRepository from "../../repositories/messageRepository.js";
import RoomRepository from "../../repositories/roomRepository.js";

const messageRepository = new MessageRepository()
const roomRepository = new RoomRepository()

export const socketManage = (io) => {
  let roomId; 

  io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('join-person-room', async (connections) => {
      const room = await roomRepository.findByConnections(connections);
      if (room) {
        roomId = room._id;
      } else {
        const newRoom = await roomRepository.save(connections);
        roomId = newRoom._id;
        console.log("newRoommm");
      }
      roomId = roomId.toString()
      socket.join(roomId);
    });
    socket.on('get-history', async (connections) => {
      const room = await roomRepository.findByConnections(connections);
      if (room) {
        roomId = room._id;
      } else {
        const newRoom = await roomRepository.save(connections);
        roomId = newRoom._id;
        console.log("newRoommm");
      }
      roomId = roomId.toString()
      socket.join(roomId);
    });
  
    socket.on('send', async (data) => {
      await messageRepository.save(data);
      socket.to(roomId).emit('receive', data);
    });
  });
  
   
}