import express from "express";
import * as fs from "fs";
import * as path from "path";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import App from "../src/App";

const server = express();

server.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);

server.get("/", (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));

  res.send(`
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React + Node.js App</title>
  </head>
  <body>
    <div id="root">${component}</div>
    <script defer="defer" src="${assets["main.js"]}"></script>
  </body>
</html>
  `);
});

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
