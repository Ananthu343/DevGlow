import Room from "../models/roomDb.js";

class RoomRepository {
    async save(connections) {
        const newRoom = new Room({ connections: connections })
        return await newRoom.save()
    }
    async saveCommunityRoom(id) {
        const newRoom = new Room({ communityId: id })
        return await newRoom.save()
    }
    async findByConnections(connections) {
        return await Room.findOne({ connections: { $all: connections } });
    }
    async findByCommunityId(id) {
        return await Room.findOne({ communityId: id });
    }
    async deleteRoomBycommunity(id) {
        return await Room.deleteOne({ communityId: id })
    }
}

export default RoomRepository