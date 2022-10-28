/**
 * name : search.js
 * author : Nevil
 * created-date : 27-Oct-2022
 * Description : Search services controllers.
 */
const searchHelper = require("@services/helper/search");

module.exports = class Search {
  /**
   * Get search results
   * @method
   * @name search
   * @param {JSON} req - Request body.
   * @returns {JSON} - Response with status message and result.
   */
  async find(req) {
    try {
      const searchResponse = await searchHelper.getSearchData(
        decodeURI(req.query.text),
        req.query.filter ? req.query.filter : false
      );
      return searchResponse;
    } catch (error) {
      return error;
    }
  }
};
