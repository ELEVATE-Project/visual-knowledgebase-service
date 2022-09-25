/**
 * name : db/suggestions/model
 * author : Vishnu
 * Date : 25-Sep-2022
 * Description : Suggestion schema
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// <- commented properties can be enabled once authentication is implemented
const suggestionSchema = new Schema({
  meta: {
    type: Object,
  },
  attachments: {
    type: Array,
  },
  blog: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    //  required: true,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    //  required: true,
  },
});

const Suggestions = db.model("suggestions", suggestionSchema);

module.exports = Suggestions;
