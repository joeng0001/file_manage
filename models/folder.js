import { Schema, model, models } from "mongoose";

const FolderSchema = new Schema({
  name: {
    type: String,
    require: [true, "folder name is required"],
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9\s]*$/.test(v);
      },
      message: (props) => `${props.value} include invalid character`,
    },
  },
  parentFolderId: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  level: {
    type: Number,
    require: [true, "each folder has a level identifier"],
    min: 1,
  },
  path: {
    type: String,
    require: [true, "path is required"],
    immutable: true,
  },
  folderList: {
    type: Array,
    default: [],
  },
  fileList: {
    type: Array,
    default: [],
  },
  comments: {
    type: String,
  },
  remarks: {
    type: String,
  },
  createdBy: {
    type: String,
    ref: "User",
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

const Folder = models.Folder || model("Folder", FolderSchema);

export default Folder;
