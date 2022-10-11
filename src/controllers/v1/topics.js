/**
 * name : topics.js
 * author : Ankit Shahu
 * created-date : 22-Sep-2022
 * Description : Topics.
 */

// Dependencies
const topicsHelper = require("@services/helper/topics");

module.exports = class Topics {
  async create(req) {
    try {
      req["decodedToken"] = { _id: "507f1f77bcf86cd799439011" }; //Until authentication is implemented.

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

  async read(req) {
    try {
      if (req.params.id) {
        const readSubTopicEntity = await topicsHelper.readSubTopics(
          req.params.id
        );
        return readSubTopicEntity;
      } else {
        const readTopicEntity = await topicsHelper.readTopics();
        return readTopicEntity;
      }
    } catch (error) {
      return error;
    }
  }
  /**
   * deletes topic
   * @method
   * @name delete
   * @param {Object} req - request data.
   * @returns {JSON} - suggestion deletion response.
   */

  async delete(req) {
    const _id = req.params.id;
    try {
      const removedTopic = await topicsHelper.delete(_id);
      return removedTopic;
    } catch (error) {
      return error;
    }
  }
};
