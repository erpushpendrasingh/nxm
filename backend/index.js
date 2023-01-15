const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/Users.route");
const { noteRouter } = require("./routes/Notes.route");
const { authenticate } = require("./middlewares/authenticate.middleware");

require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
     res.send("Welcome to the mini project");
});
app.use("/user", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
     try {
          await connection;
          console.log("SUCCESSFULL CONNECTED TO DB");
     } catch (error) {
          console.log("SOMTHING WENT WRONG");
          console.log(error);
     }
     console.log(`Listening on port ${process.env.port}`);
});
