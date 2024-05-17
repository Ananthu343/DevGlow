import Room from "../models/roomDb.js";

class RoomRepository{
    async save(connections){
        const newRoom = new Room({connections:connections})
        return await newRoom.save()
    }
    async findByConnections(connections) {
        return await Room.findOne({ connections: { $all: connections } });
    }
    
}

export default RoomRepository