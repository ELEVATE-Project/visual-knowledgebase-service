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
      if (req.method == "POST") {
        const createdTopicEntity = await topicsHelper.create(
          req.body,
          req.decodedToken._id
        );
        return createdTopicEntity;
      } else if (req.method == "PATCH") {
        const updateTopicEntity = await topicsHelper.update(
          req.params.id,
          req.body,
          req.decodedToken._id
        );
        return updateTopicEntity;
      }
    } catch (error) {
      return error;
    }
  }

  async Read(req) {
    try {
      if (req.params.id) {
        const readSubTopicEntity = await topicsHelper.readSubTopics(
          req.params.id
        );
        return readSubTopicEntity;
      } else {
        const readTopicEntity = await topicsHelper.readTopics(req.params.id);
        return readTopicEntity;
      }
    } catch (error) {
      return error;
    }
  }
};
