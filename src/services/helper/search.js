// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const suggestionData = require("@db/suggestions/query");
const topicData = require("@db/topics/query");
module.exports = class searchHelper {
  /**
   * Get search data.
   * @method
   * @name create
   * @param {Object} bodyData - suggestion body data.
   * @returns {JSON} - search response.
   */

  static async getSearchData(text, filter) {
    try {
      let results = {};
      if (!filter) {
        results.topics = await topicData.find(text);
        results.suggestions = await suggestionData.find(text);
      } else {
        if (filter == "topic") {
          results.topics = await topicData.find(text);
        } else if (filter == "suggestion") {
          results.suggestions = await suggestionData.find(text);
        }
      }

      return common.successResponse({
        statusCode: httpStatusCode.ok,
        message: "SEARCH_FETCHED",
        result: results,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
