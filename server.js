const server = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
