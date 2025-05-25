const express = require("express");
const setupMiddleware = require("./middleware/config");
const connectDB = require("./config");

const app = express();
connectDB();
setupMiddleware(app);

app.use("/users", require("./routes/user"));
app.use("/books", require("./routes/books"));
app.use("/reviews", require("./routes/reviews"));

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
