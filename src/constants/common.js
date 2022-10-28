/**
 * name : constants/common.js
 * author : Aman Kumar Gupta
 * Date : 04-Nov-2021
 * Description : All commonly used constants through out the service
 */

const successResponse = async ({
  statusCode = 500,
  responseCode = "OK",
  message,
  result = [],
  meta = {},
}) => {
  return {
    statusCode,
    responseCode,
    message,
    result,
    meta: { ...meta },
  };
};

const failureResponse = ({
  message = "Oops! Something Went Wrong.",
  statusCode = 500,
  responseCode,
}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.responseCode = responseCode;

  return error;
};

module.exports = {
  pagination: {
    DEFAULT_PAGE_NO: 1,
    DEFAULT_PAGE_SIZE: 100,
  },
  successResponse,
  failureResponse,
  guestUrls: [
    "/knowledgebase/v1/topics/read",
    "/knowledgebase/v1/suggestion/read",
    "/knowledgebase/v1/search/find",
  ],
  internalAccessUrls: [],
};
