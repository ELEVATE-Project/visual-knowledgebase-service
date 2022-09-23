/**
 * name : topics.js
 * author : Ankit Shahu
 * created-date : 22-Sep-2022
 * Description : Topics.
 */

// Dependencies
// const accountHelper = require("@services/helper/account");
const common = require("@constants/common");
const httpStatusCode = require("@generics/http-status");
const topicsHelper = require("@services/helper/topics");

module.exports = class Account {
  async create(req) {
    try {
      console.log(req.decodedToken);
      const createdUserEntity = await topicsHelper.create(
        req.body,
        req.decodedToken._id
      );
      return createdUserEntity;
    } catch (error) {
      return error;
    }
  }
};
