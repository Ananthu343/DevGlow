import User from "../models/userdb.js";

class UserRepository{
    async save(user){
       const newUser = new User(user)
       return await newUser.save()
    }
    async findById(id) {
        return await User.findById(id).select("-password");
    }
    async findByEmail(email) {
        return await User.findOne({email});
    }
    async updateUser(id, update) {
        return await User.findOneAndUpdate(
           { _id: id }, 
           update, 
           { new: true } 
        );
    }
    async deleteUser(id) {
        return await User.deleteOne({ _id: id });
    }
}

export default UserRepository