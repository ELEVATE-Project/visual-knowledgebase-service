/**
 * name : db/topics/model
 * author : Ankit Shahu
 * Date : 23-Sept-2022
 * Description : User Entity schema
 */

// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicsSchema = new Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics",
  },
  suggestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "suggestions",
  },
  topicName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const TopicsEntity = db.model("topics", topicsSchema);

module.exports = TopicsEntity;
