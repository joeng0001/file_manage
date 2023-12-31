import { Schema, model, models } from "mongoose";

const FileSchema = new Schema({
  parentFolderId: {
    type: Schema.Types.ObjectId,
    ref: "File",
    requried: [true, "each file belongs to a folder"],
  },
  name: {
    type: String,
    required: [true, "fileName is required"],
  },
  extension: {
    type: String,
    required: [true, "file extension is missing"],
  },
  path: {
    type: String,
    require: [true, "path is required"],
    immutable: true,
  },
  base64String: {
    type: String,
  },
  comments: {
    type: String,
    default: "",
  },
  remarks: {
    type: String,
  },
  createdBy: {
    type: String,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  modifiedAt: {
    type: Date,
    default: () => Date.now(),
  },
  lastViewAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const File = models.File || model("File", FileSchema);

export default File;
