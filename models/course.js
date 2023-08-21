import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
  course:{
    type:String,
    default:['no course']
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

const Course = models.Course || model('Course', CourseSchema);

export default File;