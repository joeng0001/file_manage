import { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
  parentFolderId:{
    type:String,
    requried:[true,'each file belongs to a folder']
  },
  name:{
    type:String,
    required:[true,'fileName is required'],
  },
  type:{
    type:String,
    required:[true,"file MIME type is missing"]
  },
  base64String:{
    type:String,
    required:[true,'file content is required']
  },
  encrypted:{
    type:Boolean,
    default:false
  },
  comments:{
    type:String,
    default:['']
  },
  remarks:{
    type:String,
  },
  createdBy: {
    type: String,
    
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