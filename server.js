const app = require("./app/app");


//server.js

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started succssfully on port " + port);
});
