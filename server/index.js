const express = require("express");
const app = express();
const errorHandlingMiddleware = require("./middleware/error-handler");
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(errorHandlingMiddleware);
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//fileupload middleware to parse data from files.file
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//database connecting
const dbConnection = require("./config/dbConnection");
dbConnection();

// connect to cloudinary
const connectCloudinary = require("./config/cloudinaryConnection");
connectCloudinary();

//route import and mount
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");
app.use("/api/v1/auth", auth);
app.use("/api/v1", post);
app.use("/api/v1", user);

//activate
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running on port no. ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("App is running...");
});
