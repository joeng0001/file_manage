import { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
  inodeNumber: {
    type: String,
    unique: [true, 'file inode number already exists!'],
    required: [true, 'file inode number is required!'],
  },
  remarks:{
    type:String,
  },
  createdBy: {
    type: mongoose.Schema.Types.email,
    ref: "User",
  },
  createdAt:{
    type:Date,
    default:new Date()
  },
  modifiedAt:{
    type:Date,
    default:new Date()
  }
});

const File = models.File || model('File', FileSchema);

export default File;