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
const res = require("express/lib/response");
const SuggestionData = require("@db/suggestions/query");

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
      let newTopic = await topics.createTopic(bodyData);
      return common.successResponse({
        statusCode: httpStatusCode.created,
        message: "TOPIC_CREATED_SUCCESSFULLY",
        result: [newTopic],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * update topic
   * @method
   * @name update
   * @param {Object} bodyData - entity information
   * @param {string} _id - user id.
   * @returns {JSON} - returns updated entity information
   */
  static async update(id, bodyData, _id) {
    bodyData.updatedBy = ObjectId(_id);
    try {
      let filter = {};
      if (ObjectId.isValid(id)) {
        filter = {
          _id: ObjectId(id),
        };
      } else {
        return common.failureResponse({
          message: "TOPIC_ID_INVALID",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      const result = await topics.updateOneForm(filter, bodyData, {});

      if (result === "TOPIC_ALREADY_EXISTS") {
        return common.failureResponse({
          message: "TOPIC_ALREADY_EXISTS",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      } else if (result === "ENTITY_NOT_FOUND") {
        return common.failureResponse({
          message: "TOPIC_NOT_FOUND",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      return common.successResponse({
        statusCode: httpStatusCode.accepted,
        message: "TOPIC_UPDATED_SUCCESSFULLY",
      });
    } catch (error) {
      throw error;
    }
  }
  static async delete(_id) {
    try {
      let bodyData = {
        deleted: true,
      };
      let filter = {
        _id: ObjectId(_id),
      };
      const result = await topics.updateOneForm(filter, bodyData, {});
      if (result === "TOPIC_DELETION_FAILED") {
        return common.failureResponse({
          message: result,
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      return common.successResponse({
        statusCode: httpStatusCode.accepted,
        message: "TOPIC_DELETED_SUCCESSFULLY",
      });
    } catch (error) {
      throw error;
    }
  }

  static async readTopics() {
    try {
      const result = await topics.findTopics();
      console.log(result);
      if (!result) {
        return common.successResponse({
          statusCode: httpStatusCode.accepted,
          message: "TOPICS_FETCHED",
          result: result,
        });
      } else {
        console.log(result);
        return common.successResponse({
          statusCode: httpStatusCode.ok,
          message: "TOPICS_FETCHED",
          result: result,
        });
      }
    } catch (error) {
      return error;
    }
  }

  static async readSubTopics(topicId) {
    try {
      const filter = {
        topicId: topicId,
        deleted: false,
      };
      // let result = {};
      const result = await topics.findSubTopics(filter);
      // result.subTopic = subTopics;
      if (!result) {
        return common.failureResponse({
          statusCode: httpStatusCode.bad_request,
          message: "NO_SUB_TOPICS_FOUND",
          result: result,
        });
      } else {
        // let suggestionIds = [];
        // subTopics.forEach((element) => {
        //   if (element.suggestionId) {
        //     suggestionIds.push(element.suggestionId);
        //   }
        // });
        // const suggestion = await SuggestionData.findAllSuggestion(
        //   { _id: { $in: suggestionIds } },
        //   {}
        // );
        // result.suggestion = suggestion;

        return common.successResponse({
          statusCode: httpStatusCode.ok,
          message: "TOPICS_FETCHED",
          result: result,
        });
      }
    } catch (error) {
      return error;
    }
  }
};
