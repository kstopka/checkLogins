const POP3Client = require("poplib");
const Imap = require("imap");
const { setResult } = require("./setResult");

const ports = {
  imap: 993,
  pop: 995,
};

function checkLogin(lp, email, password, server, protocol) {
  const port = ports[protocol.toLowerCase()];

  if (!port) {
    console.log("Unsupported protocol:", protocol);
    return;
  }

  if (protocol.toLowerCase() === "pop") {
    const client = new POP3Client(port, server, {
      tlserrs: false,
      enabletls: true,
      debug: false,
    });

    client.on("connect", () => {
      client.login(email, password);
    });

    client.on("login", (status, rawdata) => {
      if (status) {
        console.log("Login successful using POP3!", lp);
        // setResult({ lp, email, result: true });
      } else {
        console.log("Login error using POP3:", rawdata);
        setResult({ lp, email, result: false });
      }
      client.quit();
    });

    client.on("error", (err) => {
      console.log("Error connecting to POP3 server:", err);
    });
  } else if (protocol.toLowerCase() === "imap") {
    const imap = new Imap({
      user: email,
      password: password,
      host: server,
      port: port,
      tls: true,
    });

    imap.once("ready", () => {
      console.log("Login successful using IMAP!", lp);
      // setResult({ lp, email, result: true });
      imap.end();
    });

    imap.once("error", (err) => {
      console.log("Login error using IMAP:", err);
      setResult({ lp, email, result: false });
    });

    imap.connect();
  } else {
    console.log("Unsupported protocol:", protocol);
  }
}

module.exports = { checkLogin };
