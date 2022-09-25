/**
 * name : services/helper/userentity.js
 * author : Ankit Shahu
 * created-date : 23-Sept-2022
 * Description : topic related operations.
 */

// Dependencies
const ObjectId = require("mongoose").Types.ObjectId;

const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const topics = require("@db/topics/query");

module.exports = class topicsHelper {
  /**
   * create topic
   * @method
   * @name create
   * @param {Object} bodyData - entity information
   * @param {string} _id - user id.
   * @returns {JSON} - returns created entity information
   */
  static async create(bodyData, _id) {
    bodyData.createdBy = ObjectId(_id);
    bodyData.updatedBy = ObjectId(_id);
    try {
      const filter = { topicName: bodyData.topicName };
      const topic = await topics.findOneTopic(filter);

      if (topic) {
        return common.failureResponse({
          message: "TOPIC_ALREADY_EXISTS",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      await topics.createTopic(bodyData);
      return common.successResponse({
        statusCode: httpStatusCode.created,
        message: "TOPIC_CREATED_SUCCESSFULLY",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
