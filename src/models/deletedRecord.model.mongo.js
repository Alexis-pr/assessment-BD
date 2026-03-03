import mongoose from "mongoose";

const deletedRecordSchema = new mongoose.Schema({
  tabla:     { type: String, required: true }, // 
  data:      { type: Object, required: true },
  deletedAt: { type: Date,   default: Date.now }
});

const DeletedRecord = mongoose.model("DeletedRecord", deletedRecordSchema);

export default DeletedRecord;