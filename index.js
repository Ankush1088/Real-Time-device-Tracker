const express = require("express");
const socket = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 7887;
const path = require("path");
const io = socket(server);
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",function(socket) {
  console.log("connected");
})


app.get("/", (req, res) => {
  res.render("index");
});
server.listen(port, function () {
  console.log(`server is start on port number ${port}`);
});
