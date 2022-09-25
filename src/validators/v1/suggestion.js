/**
 * name : validators/v1/suggestion.js
 * author : vishnu
 * Date : 25-Sept-2022
 * Description : Validations of suggestion controller
 */

module.exports = {
  create: (req) => {
    req.checkBody("blog").trim().notEmpty().withMessage("blog field is empty");
  },
  delete: (req) => {
    req
      .checkParams("id")
      .notEmpty()
      .withMessage("id param is empty")
      .isMongoId()
      .withMessage("id is invalid");
  },
  read: (req) => {
    req
      .checkParams("id")
      .notEmpty()
      .withMessage("id param is empty")
      .isMongoId()
      .withMessage("id is invalid");
  },
};
