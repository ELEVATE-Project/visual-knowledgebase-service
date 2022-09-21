/**
 * name : utils.js
 * author : Aman
 * created-date : 04-Nov-2021
 * Description : Utils helper function.
 */

const bcryptJs = require("bcryptjs");
const {
  AwsFileHelper,
  GcpFileHelper,
  AzureFileHelper,
} = require("files-cloud-storage");
const momentTimeZone = require("moment-timezone");
const moment = require("moment");
const path = require("path");
const md5 = require("md5");

const hash = (str) => {
  const salt = bcryptJs.genSaltSync(10);
  let hashstr = bcryptJs.hashSync(str, salt);
  return hashstr;
};

const getIstDate = () => {
  return new Date(new Date().getTime() + (5 * 60 + 30) * 60000);
};

const getDownloadableUrl = async (imgPath) => {
  if (process.env.CLOUD_STORAGE === "GCP") {
    const options = {
      destFilePath: imgPath,
      bucketName: process.env.DEFAULT_GCP_BUCKET_NAME,
      gcpProjectId: process.env.GCP_PROJECT_ID,
      gcpJsonFilePath: path.join(__dirname, "../", process.env.GCP_PATH),
    };
    imgPath = await GcpFileHelper.getDownloadableUrl(options);
  } else if (process.env.CLOUD_STORAGE === "AWS") {
    const options = {
      destFilePath: imgPath,
      bucketName: process.env.DEFAULT_AWS_BUCKET_NAME,
      bucketRegion: process.env.AWS_BUCKET_REGION,
    };
    imgPath = await AwsFileHelper.getDownloadableUrl(
      options.destFilePath,
      options.bucketName,
      options.bucketRegion
    );
  } else if (process.env.CLOUD_STORAGE === "AZURE") {
    const options = {
      destFilePath: imgPath,
      containerName: process.env.DEFAULT_AZURE_CONTAINER_NAME,
      expiry: 30,
      actionType: "rw",
      accountName: process.env.AZURE_ACCOUNT_NAME,
      accountKey: process.env.AZURE_ACCOUNT_KEY,
    };
    imgPath = await AzureFileHelper.getDownloadableUrl(options);
  }
  return imgPath;
};

const getTimeZone = (date, format, tz = null) => {
  let timeZone = moment(date);
  if (tz) {
    timeZone.tz(tz);
  }
  timeZone = moment(timeZone).format(format);
  return timeZone;
};

const utcFormat = () => {
  return momentTimeZone().utc().format("YYYY-MM-DDTHH:mm:ss");
};

/**
 * md5 hash
 * @function
 * @name md5Hash
 * @returns {String} returns uuid.
 */

function md5Hash(value) {
  return md5(value);
}

module.exports = {
  hash: hash,

  getIstDate: getIstDate,

  getDownloadableUrl: getDownloadableUrl,
  getTimeZone: getTimeZone,
  utcFormat: utcFormat,
  md5Hash: md5Hash,
};
