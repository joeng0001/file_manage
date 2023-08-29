import { Schema, model, models } from 'mongoose';

const FolderSchema = new Schema({
  name:{
    type:String,
    require:[true,'folder name is required']
  },
  parentFolderId:{
    type:String,
    require:[true,'each folder must belongs to parent folder']
  },
  level:{
    type:Number,
    require:[true,'each folder has a level identifier']
  },
  folderList:{
    type:Array,
    default:[]
  },
  fileList:{
    type:Array,
    default:[]
  },
  comment:{
    type:String,
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

const Folder = models.Folder || model('Folder', FolderSchema);

export default File;