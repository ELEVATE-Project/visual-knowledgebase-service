/**
 * name : cloud-service.spec.js
 * author : Nevil
 * created-date : 27-Sep-2022
 * Description : Cloud services unit test.
 */
describe("Cloud-service", () => {
  const mongoose = require("mongoose");
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });
  async function loadMongo() {
    let db = await mongoose.connect(global.__MONGO_URI__ + global.mongoDBName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global.db = db;
    return;
  }

  describe("Files api test", () => {
    // let profile;
    // let request;
    let utils;
    let filesHelpers;
    let cloudServices;

    beforeAll(async () => {
      await loadMongo();
      utils = require("@generics/utils");
      filesHelpers = require("@services/helper/files");
      cloudServices = require("@generics/cloud-services");

      return;
    });

    test("Should return Downloadable Url", async () => {
      const expectedResult = {
        responseCode: "OK",
        message: "Download Url Generated Successfully.",
        result:
          "https://aws-bucket-storage-name.s3.ap-south-1.amazonaws.com/users/62832531a05cbd57b273aebb-1654149589875-image.jpg",
        meta: {},
      };
      const mockedUtilsResponse =
        "https://aws-bucket-storage-name.s3.ap-south-1.amazonaws.com/users/62832531a05cbd57b273aebb-1654149589875-image.jpg";
      const mockedUtils = jest.spyOn(utils, "getDownloadableUrl");
      mockedUtils.mockResolvedValueOnce(mockedUtilsResponse);

      const actual = await filesHelpers.getDownloadableUrl(
        "users/62832531a05cbd57b273aebb-1654149589875-image.jpg"
      );
      expect(actual.responseCode).toEqual(expectedResult.responseCode);
      expect(actual.result).toEqual(expectedResult.result);
    });

    test("Should return Singed Url", async () => {
      process.env.CLOUD_STORAGE = "AWS";

      const expectedResult = {
        responseCode: "OK",
        message: "Signed Url Generated Successfully.",
        result: {
          signedUrl:
            "https://aws-bucket-storage-name.s3.ap-south-1.amazonaws.com/test/laptop1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=aws-access-key-id%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220927T085730Z&X-Amz-Expires=1800&X-Amz-Signature=0bf9e3dfc3f4121d5dfc52ee3fb37ad157dd5f85fb3e112cc90d0ae9a555c991&X-Amz-SignedHeaders=host",
          filePath: "test/laptop1.jpg",
          destFilePath: "test/laptop1.jpg",
        },
        meta: {},
      };
      const mockedCloudServiceResponse = {
        signedUrl:
          "https://aws-bucket-storage-name.s3.ap-south-1.amazonaws.com/test/laptop1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=aws-access-key-id%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220927T085730Z&X-Amz-Expires=1800&X-Amz-Signature=0bf9e3dfc3f4121d5dfc52ee3fb37ad157dd5f85fb3e112cc90d0ae9a555c991&X-Amz-SignedHeaders=host",
        filePath: "test/laptop1.jpg",
      };

      const mockedCloudServices = jest.spyOn(cloudServices, "getAwsSignedUrl");
      mockedCloudServices.mockResolvedValueOnce(mockedCloudServiceResponse);

      const actual = await filesHelpers.getSignedUrl(
        "laptop1.jpg",
        "507f1f77bcf86cd799439011",
        "test"
      );
      expect(actual.responseCode).toEqual(expectedResult.responseCode);
      expect(actual.result).toEqual(expectedResult.result);
    });

    afterAll(async () => {
      try {
        process.env = OLD_ENV;
        mongoose.connection.close();
      } catch (error) {
        console.log(`
            You did something wrong
            ${error}
          `);
        throw error;
      }
    });
  });
});
