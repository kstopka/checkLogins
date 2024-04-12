const { checkLogin } = require("./utils/emailAuth");
const { getAuths } = require("./utils/getAuths");
const { clearResult } = require("./utils/clearResult");

require("dotenv").config();

const { SERVER, EMAIL_PART, PASSWORD_PART } = process.env;

clearResult();

const auths = getAuths(EMAIL_PART, PASSWORD_PART);

auths.forEach(({ lp, email, password, protocol }) => {
  checkLogin(lp, email, password, SERVER, protocol);
});
