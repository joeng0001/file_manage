import { Schema, model, models,SchemaType } from 'mongoose';

const FolderSchema = new Schema({
  name:{
    type:String,
    require:[true,'folder name is required'],
    validate:{
      validator:v=>v.includes('/'),
      message:props => `${props.value} include invalid character`
    }
  },
  parentFolderId:{
    type:SchemaType.ObjectId,
    require:[true,'each folder must belongs to parent folder']
  },
  level:{
    type:Number,
    require:[true,'each folder has a level identifier'],
    min:1,
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
    immutable:true,
  },
  createdAt:{
    type:Date,
    default:()=>Date.now(),
    immutable:true,
  },
  modifiedAt:{
    type:Date,
    default:()=>Date.now()
  }
});

const Folder = models.Folder || model('Folder', FolderSchema);

export default File;