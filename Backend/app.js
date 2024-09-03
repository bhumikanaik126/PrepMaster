const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users");
const cors=require("cors")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({}))
app.use(express.json());
app.use(cookieParser());

app.use("/users",userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the home page! The server is running.");
});

app.listen(PORT,  () => {
    console.log(`Listening to port ${PORT}`);
});
