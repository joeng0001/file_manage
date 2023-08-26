import { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
  course:{
    type:String,
    default:['no course']
  },
  fileName:{
    type:String,
    required:[true,'fileNmae is required'],
  },
  fileType:{
    type:String,
    required:[true,"file MIME type is missing"]
  },
  secured:{
    type:Boolean,
    default:false
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