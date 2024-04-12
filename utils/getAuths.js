const { getData } = require("./getData");

const getAuths = (emailPart, passwordPart) => {
  const emails = getData(emailPart);
  const passwords = getData(passwordPart);
  const result = [];

  const emailMap = new Map(emails.map((obj) => [obj["L.P."], obj]));

  for (const passwordObj of passwords) {
    const lp = passwordObj["L.P."];
    if (emailMap.has(lp)) {
      const emailObj = emailMap.get(lp);
      // if (emailObj["Czynność do wykonania"] !== "usunąć") {
      // }
      if ("Hasło" in passwordObj) {
        const mergedObj = {
          lp,
          email: emailObj["Nazwa konta"],
          password: passwordObj["Hasło"],
          protocol: emailObj.protocol,
        };
        result.push(mergedObj);
      }
    }
  }

  return result;
};

module.exports = { getAuths };
