/**
 * name : models/entities/query
 * author : Ankit Shahu
 * Date : 23-Sept-2022
 * Description : Topics query
 */

// Dependencies

const Topics = require("./model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class UserEntityData {
  static createTopic(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await new Topics(data).save();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findOneTopic(filter, projection = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const userEntityData = await Topics.findOne(filter, projection);
        resolve(userEntityData);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateOneForm(filter, update, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Topics.updateOne(filter, update, options);
        if (
          (res.n === 1 && res.nModified === 1) ||
          (res.matchedCount === 1 && res.modifiedCount === 1)
        ) {
          resolve("TOPIC_UPDATED");
        } else if (
          (res.n === 1 && res.nModified === 0) ||
          (res.matchedCount === 1 && res.modifiedCount === 0)
        ) {
          resolve("TOPIC_ALREADY_EXISTS");
        } else {
          resolve("TOPIC_NOT_FOUND");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  static findTopics() {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = {
          topicId: null,
          deleted: false,
        };
        console.log("reched to qury function");
        const userEntityData = await Topics.find(filter, {
          _id: 1,
          topicName: 1,
          description: 1,
          topicId: 1,
          suggestionId: 1,
        });
        console.log(userEntityData);
        resolve(userEntityData);
      } catch (error) {
        reject(error);
      }
    });
  }

  static findSubTopics(filter) {
    return new Promise(async (resolve, reject) => {
      try {
        filter.topicId = ObjectId(filter.topicId);

        const subTopic = await Topics.aggregate([
          {
            $lookup: {
              from: "suggestions",
              localField: "suggestionId",
              foreignField: "_id",
              as: "suggestion",
            },
          },
          {
            $match: {
              $and: [{ topicId: filter.topicId }, { deleted: filter.deleted }],
            },
          },

          {
            $project: {
              _id: 1,
              topicName: 1,
              description: 1,
              topicId: 1,
              suggestion: "$suggestion",
            },
          },
        ]);
        console.log(subTopic);
        resolve(subTopic);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};
