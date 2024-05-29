import MessageRepository from "../../repositories/messageRepository.js";
import RoomRepository from "../../repositories/roomRepository.js";

const messageRepository = new MessageRepository()
const roomRepository = new RoomRepository()

export const socketManage = (io) => {

  io.on('connection', (socket) => {
    console.log('New client connected');
    let roomId; 

    socket.on('join-person-room', async (connections) => {
      const room = await roomRepository.findByConnections(connections);
      if (room) {
        console.log("joined old person room",room);
        roomId = room._id;
      } else {
        const newRoom = await roomRepository.save(connections);
        roomId = newRoom._id;
        console.log("newRoommm");
      }
      roomId = roomId.toString()
      console.log(roomId,connections[1]);
      socket.join(roomId);
    });
  
    socket.on('send', async (data) => {
      await messageRepository.save(data);
      socket.to(roomId).emit('receive', data);
      console.log(roomId,data.receiver);
    });

    socket.on('typing', async () => { 
      console.log(roomId);
      if (roomId) {
        socket.to(roomId).emit('typingStatus', {status : true});
      setTimeout(() => {
        socket.to(roomId).emit('typingStatus', {status : false});
      }, 1000);
      }
    });

    socket.on('leave-room', async () => {
      if (roomId) {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
        roomId = null;
      }
    });

    socket.on('join-community-room', async (id) => {
      console.log(id);
      const room = await roomRepository.findByCommunityId(id);
      console.log("joined community room",room);
      roomId = room._id;
      roomId = roomId.toString()
      socket.join(roomId);
    });

    socket.on('send-community-message', async (data) => {
      await messageRepository.save(data);
      socket.to(roomId).emit('receive-community-message', data);
    });

    socket.on('get-unread-messages', async (id)=>{
      const data = await messageRepository.getUnread(id);
      socket.emit('unreadMessages',data)
    })

    socket.on('mark-read', async (data)=>{
       await messageRepository.markRead(data.sender,data.receiver);
    })

  });
  
   
}