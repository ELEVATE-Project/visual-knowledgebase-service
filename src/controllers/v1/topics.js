/**
 * name : topics.js
 * author : Ankit Shahu
 * created-date : 22-Sep-2022
 * Description : Topics.
 */

// Dependencies
const topicsHelper = require("@services/helper/topics");

module.exports = class Account {
  async create(req) {
    try {
      const createdTopicEntity = await topicsHelper.create(
        req.body,
        req.decodedToken._id
      );
      return createdTopicEntity;
    } catch (error) {
      return error;
    }
  }

  async update(req) {
    try {
      const updateTopicEntity = await topicsHelper.update(
        req.params.id,
        req.body,
        req.decodedToken._id
      );
      return updateTopicEntity;
    } catch (error) {
      return error;
    }
  }
};
