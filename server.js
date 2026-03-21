const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const basicAuth = require("express-basic-auth");

const app = express();
app.set("trust proxy", 1);
const PORT = 5000;
const SERVE_DIR = __dirname;

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  }),
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

if (process.env.ENABLE_BASIC_AUTH === "true") {
  const user = process.env.BASIC_AUTH_USER || "demo";
  const pass = process.env.BASIC_AUTH_PASS || "demo";
  app.use(
    basicAuth({
      users: { [user]: pass },
      challenge: true,
      realm: "SherryBlossomsPreview",
    }),
  );
}

app.use(
  express.static(SERVE_DIR, {
    index: "index.html",
    extensions: ["html", "htm"],
    dotfiles: "ignore",
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "no-cache");
    },
  }),
);

app.get("*", (req, res) => {
  res.sendFile(path.join(SERVE_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serving at http://0.0.0.0:${PORT}`);
});
