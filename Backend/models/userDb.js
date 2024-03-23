import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  about:{
    type:String,
  },
  profile_url:{
    type:String,
    default:""
  },
  banner_url:{
    type:String,
    default:""
  },
  contactInfo:{
    type:String,
  },
  gender:{
    type:String,
  },
  profile_visibility:{
    type:String,
    default:"public"
  },
  reportCount:{
    type:Number,
  },
  status:{
    type:Boolean,
    default:false
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  token:{
    type:String
  },
  createdAt: { type: Date, default: Date.now }
})

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

UserSchema.pre('findOneAndUpdate', async function(next) {
    if (this.getUpdate().password) {
        const salt = await bcrypt.genSalt(10);
        this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, salt);
    }
    next();
});
  
UserSchema.methods.matchPassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords: ', error);
    }
};
  
  UserSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 180,
    partialFilterExpression: { token: { $ne: "verified" } }
   });

  const User = mongoose.model("Users", UserSchema);
  
  export default User;