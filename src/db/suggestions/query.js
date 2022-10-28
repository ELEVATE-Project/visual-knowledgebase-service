/**
 * name : models/suggestions/query
 * author : Vishnu
 * Date : 25-Sept-2022
 * Description : suggestion collection database operations
 */

const ObjectId = require("mongoose").Types.ObjectId;
const Suggestion = require("./model");

module.exports = class SuggestionData {
  static createSuggestion(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await new Suggestion(data).save();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateOneSuggestion(_id, update, options = {}) {
    //  update.updatedBy = ObjectId(update.updatedBy)   // <- Use after authentication enabled.
    const filter = {
      _id: ObjectId(_id),
    };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Suggestion.findOneAndUpdate(filter, update, options);
        if (res == null) {
          resolve({
            message: "SUGGESTION_UPDATION_FAILED",
          });
        }
        resolve({
          message: "SUGGESTION_UPDATED",
          data: [res],
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteOneSuggestion(_id) {
    const filter = {
      _id: ObjectId(_id),
    };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Suggestion.findOneAndDelete(filter);
        if (res == null) {
          resolve("SUGGESTION_DELETION_FAILED");
        }
        resolve("SUGGESTION_DELETED_SUCCESSFULLY");
      } catch (error) {
        reject(error);
      }
    });
  }

  static findOneSuggestion(suggestionId) {
    const filter = { _id: suggestionId };
    return new Promise(async (resolve, reject) => {
      try {
        const suggestionData = await Suggestion.findOne(filter);
        if (suggestionData == null) {
          resolve({
            message: "SUGGESTION_NOT_FOUND",
          });
        }
        resolve({
          message: "SUGGESTION_FETCHED_SUCCESSFULLY",
          data: [suggestionData],
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static findAllSuggestion(filter, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await Suggestion.find(filter, projection);
        resolve(usersData);
      } catch (error) {
        reject(error);
      }
    });
  }
  static find(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Suggestion.find(
          { $text: { $search: data } },
          { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
};
