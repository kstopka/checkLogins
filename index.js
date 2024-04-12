const { checkLogin } = require("./utils/emailAuth");
const { getAuths } = require("./utils/getAuths");
const { clearResult } = require("./utils/clearResult");

const server = "";
const emailPart = "";
const passwordPart = "";

clearResult();

const auths = getAuths(emailPart, passwordPart);

auths.forEach(({ lp, email, password, protocol }) => {
  checkLogin(lp, email, password, server, protocol);
});
