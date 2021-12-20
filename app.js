const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(express.static("views"));

app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("sejarahKerjaan", { layout: "main-layout" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
