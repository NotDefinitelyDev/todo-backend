const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB is connected Successfully");
  })
  .catch((err) => {
    console.log("Something went very wrong", err);
  });

app.listen(port, () => {
  console.log("Server is ON");
});
