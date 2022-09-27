const cloudServices = require("@generics/cloud-services");
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const utils = require("@generics/utils");

module.exports = class FilesHelper {
  static async getSignedUrl(fileName, _id, dynamicPath) {
    try {
      let destFilePath;
      if (dynamicPath != "") {
        destFilePath = dynamicPath + "/" + fileName;
      } else {
        destFilePath = `vks/${_id}-${new Date().getTime()}-${fileName}`;
      }

      let response;
      if (process.env.CLOUD_STORAGE === "GCP") {
        response = await cloudServices.getGcpSignedUrl(destFilePath);
      } else if (process.env.CLOUD_STORAGE === "AWS") {
        response = await cloudServices.getAwsSignedUrl(destFilePath);
      } else if (process.env.CLOUD_STORAGE === "AZURE") {
        response = await cloudServices.getAzureSignedUrl(destFilePath);
      }
      response.destFilePath = destFilePath;

      return common.successResponse({
        message: "SIGNED_URL_GENERATED_SUCCESSFULLY",
        statusCode: httpStatusCode.ok,
        responseCode: "OK",
        result: response,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getDownloadableUrl(path) {
    try {
      let response = await utils.getDownloadableUrl(path);
      return common.successResponse({
        message: "DOWNLOAD_URL_GENERATED_SUCCESSFULLY",
        statusCode: httpStatusCode.ok,
        responseCode: "OK",
        result: response,
      });
    } catch (error) {
      throw error;
    }
  }
};
