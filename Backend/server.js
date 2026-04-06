import express from "express";
import "dotenv/config"
import dataBase from "./Database/db.js";
import router from "./Routes/recipeRoute.js";
import cors from 'cors'
import userRouter from './Routes/userRoute.js'

const app = express();

app.use(express.json())
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api", router);
app.use("/api", userRouter)

dataBase()

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`server is running Port ${PORT}`)
})