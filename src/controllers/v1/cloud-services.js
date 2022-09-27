/**
 * name : cloud-services.js
 * author : Nevil
 * created-date : 27-Sep-2022
 * Description : Cloud services controllers.
 */
const filesHelpers = require("@services/helper/files");

module.exports = class CloudServices {
  /**
   * Get Signed Url
   * @method
   * @name getSignedUrl
   * @param {JSON} req  request body.
   * @returns {JSON} Response with status message and result.
   */
  async getSignedUrl(req) {
    try {
      req["decodedToken"] = { _id: "507f1f77bcf86cd799439011" }; //Until authentication is implemented.
      const signedUrlResponse = await filesHelpers.getSignedUrl(
        req.query.fileName,
        req.decodedToken._id,
        req.query.dynamicPath ? req.query.dynamicPath : ""
      );
      return signedUrlResponse;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get downloadable Url
   * @method
   * @name getDownloadableUrl
   * @param {JSON} req  request body.
   * @returns {JSON} Response with status message and result.
   */
  async getDownloadableUrl(req) {
    try {
      const downloadUrlResponse = await filesHelpers.getDownloadableUrl(
        req.query.filePath
      );
      return downloadUrlResponse;
    } catch (error) {
      return error;
    }
  }
};
