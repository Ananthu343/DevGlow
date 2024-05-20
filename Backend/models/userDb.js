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
  profile_visibility:{
    type:String,
    default:"public"
  },
  reportCount:{
    type:Number,
    default:0
  },
  status:{
    type:Boolean,
    default:false
  },
  roles: [{
    type: String,
    enum: ['user', 'admin', 'editor'],
    default:'user'
 }],
  token:{
    type:String
  },
  isVerified: { type: Boolean, default: false },
  dob:{
    type:String
  },
  gender:{
    type:String
  },
  savedPosts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }],
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  followers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  blocked:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  createdAt: { type: Date, default: Date.now }
})

UserSchema.index({ createdAt: 1 }, {
  expireAfterSeconds: 180, // 3 minutes
  partialFilterExpression: { isVerified: false }
 });
 

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
     throw new Error('Error comparing passwords: ', error.message);
  }
 };
 
 const User = mongoose.model("Users", UserSchema);
 
 export default User;