// Dependencies
const ObjectId = require("mongoose").Types.ObjectId;
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const suggestionData = require("@db/suggestions/query");

module.exports = class SuggestionHelper {
  /**
   * Create suggestion.
   * @method
   * @name create
   * @param {Object} bodyData - suggestion body data.
   * @param {String} userId - user id.               // <- This param can be included when authentication enabled in the service
   * @returns {JSON} - suggestion created response.
   */

  static async create(bodyData, userId = "") {
    // <- This param can be included when authentication enabled in the service
    // bodyData.createdBy = ObjectId(userId)
    // bodyData.updatedBy = ObjectId(userId)
    try {
      let newSuggestion = await suggestionData.createSuggestion(bodyData);
      return common.successResponse({
        statusCode: httpStatusCode.created,
        message: "SUGGESTION_CREATED_SUCCESSFULLY",
        result: [newSuggestion],
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update suggestion.
   * @method
   * @name update
   * @param {Object} bodyData - suggestion body data.
   * @param {String} _id - suggestion id.
   * @param {String} loggedInUserId - logged in user id.
   * @returns {JSON} - Suggestion updted response.
   */

  static async update(bodyData, _id, loggedInUserId = "") {
    // bodyData.updatedBy = loggedInUserId  // <-Use after enabling authorization
    bodyData.updatedAt = new Date().getTime();
    try {
      if (!_id || _id == "") {
        return common.failureResponse({
          message: "SUGGESTION_ID_REQUIRED",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      const result = await suggestionData.updateOneSuggestion(_id, bodyData, {
        new: true,
      });
      if (result.message === "SUGGESTION_UPDATION_FAILED") {
        return common.failureResponse({
          message: "SUGGESTION_UPDATION_FAILED",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      return common.successResponse({
        statusCode: httpStatusCode.accepted,
        message: "SUGGESTION_UPDATED_SUCCESSFULLY",
        result: result.data,
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Delete suggestion.
   * @method
   * @name delete
   * @param {String} _id - Delete suggestion.
   * @returns {JSON} - suggestion deleted response.
   */

  static async delete(_id) {
    try {
      const result = await suggestionData.deleteOneSuggestion(_id);
      if (result === "SUGGESTION_DELETION_FAILED") {
        return common.failureResponse({
          message: result,
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      return common.successResponse({
        statusCode: httpStatusCode.accepted,
        message: result,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Read suggestion.
   * @method
   * @name read
   * @param {String} sugge_stionId - suggestion id.
   * @returns {JSON} - suggestions read response.
   */

  static async read(suggestionId) {
    try {
      let suggestion = await suggestionData.findOneSuggestion(suggestionId);
      if (suggestion.message === "SUGGESTION_NOT_FOUND") {
        return common.failureResponse({
          message: suggestion.message,
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      return common.successResponse({
        statusCode: httpStatusCode.accepted,
        message: suggestion.message,
        result: suggestion.data,
      });
    } catch (error) {
      throw error;
    }
  }
};
