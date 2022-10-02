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

  static deleteOneTopic(_id) {
    const filter = {
      _id: ObjectId(_id),
    };
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Topics.findOneAndDelete(filter);
        res == null
          ? resolve("TOPIC_DELETION_FAILED")
          : resolve("TOPIC_DELETED_SUCCESSFULLY");
      } catch (error) {
        reject(error);
      }
    });
  }
};
