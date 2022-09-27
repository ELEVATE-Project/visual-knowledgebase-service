module.exports = {
  getSignedUrl: (req) => {
    req
      .checkQuery("fileName")
      .trim()
      .notEmpty()
      .withMessage("fileName field is empty");
  },
  getDownloadableUrl: (req) => {
    req
      .checkQuery("filePath")
      .trim()
      .notEmpty()
      .withMessage("filePath field is empty");
  },
};
