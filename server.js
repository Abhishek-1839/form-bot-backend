const express = require ("express");
const bodyparser =require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./route/User");
const workspaceRoutes = require("./route/workspaceRoutes");
const formRoutes = require("./route/formRoutes");
const userMiddleware = require('./middleware/userMiddleware');
const cors = require("cors");
dotenv.config();


const app = express();
app.use(express.json());
const corsOptions = {
  origin: "https://shiny-cupcake-2d6516.netlify.app/",
  // origin : "http://localhost:5173",
  methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(bodyparser.json());
const port = 3000;



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("mongodb connected")})
.catch((error)=>{console.log(`error connecting ${error}`)});
app.get("/healthCheck", (req, res) => {
  res.send("Working properly");
});
app.use("/user", userRoutes);
app.use('/api/workspaces', userMiddleware , workspaceRoutes);
app.use('/forms', userMiddleware, formRoutes );

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.error("Error starting server:", err);
  }
});