/**
 * name : configs
 * author : Ankit Shahu
 * Date : 21-Sep-2022
 * Description : Contains connections of all configs
 */

require("./mongodb")();
const path = require("path");
global.PROJECT_ROOT_DIRECTORY = path.join(__dirname, "..");
