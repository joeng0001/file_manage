import { Schema, model, models, SchemaType } from "mongoose";

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
  type: {
    type: String,
    required: [true, "file MIME type is missing"],
  },
  path: {
    type: String,
    require: [true, "path is required"],
    immutable: true,
  },
  base64String: {
    type: String,
  },
  encrypted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
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
});

const File = models.File || model("File", FileSchema);

export default File;
