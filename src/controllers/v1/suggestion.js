/**
 * name : suggestion.js
 * author : Vishnu
 * created-date : 22-sept-2021
 * Description : Suggestions Controller.
 */

// Dependencies
const suggestionHelper = require("@services/helper/suggestion");

module.exports = class Suggestion {
  /**
   * create suggestion
   * @method
   * @name create
   * @param {Object} req - request data.
   * @returns {JSON} - suggestion creation object.
   */

  async create(req) {
    const params = req.body;
    try {
      if (req.method === "POST") {
        const createdSuggestion = await suggestionHelper.create(
          params
          // req.decodedToken._id // <- can pass when authentication implemented.
        );
        return createdSuggestion;
      } else if (req.method === "PATCH") {
        const params = req.body;
        const _id = req.params.id; // suggetion id.
        const updatedSuggestion = await suggestionHelper.update(
          params,
          _id
          // req.decodedToken._id // <- can pass when authentication implemented.
        );
        return updatedSuggestion;
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * reads suggestion
   * @method
   * @name read
   * @param {Object} req - request data.
   * @returns {JSON} - suggestion.
   */

  async read(req) {
    const _id = req.params.id;
    try {
      const form = await suggestionHelper.read(_id);
      return form;
    } catch (error) {
      return error;
    }
  }

  /**
   * deletes suggestion
   * @method
   * @name delete
   * @param {Object} req - request data.
   * @returns {JSON} - suggestion deletion response.
   */

  async delete(req) {
    const _id = req.params.id;
    try {
      const removedSuggestion = await suggestionHelper.delete(_id);
      return removedSuggestion;
    } catch (error) {
      return error;
    }
  }
};
