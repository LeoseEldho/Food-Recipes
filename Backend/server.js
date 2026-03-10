import express from "express";
import "dotenv/config"
import dataBase from "./Database/db.js";
import router from "./Routes/recipeRoute.js";

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.use("/",router)

dataBase()

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
    console.log(`server is running Port ${PORT}`)
})