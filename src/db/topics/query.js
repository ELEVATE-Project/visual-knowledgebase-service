/**
 * name : models/entities/query
 * author : Aman Gupta
 * Date : 04-Nov-2021
 * Description : Users entities database operations
 */

// Dependencies

const Topics = require("./model");

module.exports = class UserEntityData {
  static createTopic(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await new Topics(data).save();
        resolve(true);
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
};
