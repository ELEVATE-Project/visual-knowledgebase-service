/**
 * name : validators/v1/suggestion.js
 * author : vishnu
 * Date : 25-Sept-2022
 * Description : Validations of suggestion controller
 */

module.exports = {
  find: (req) => {
    req.checkQuery("text").notEmpty().withMessage("text param is empty");
    if (req.query.filter) {
      req
        .checkQuery("filter")
        .isIn(["suggestion", "topic"])
        .withMessage("filter is invalid");
    }
  },
};