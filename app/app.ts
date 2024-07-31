import dotenv from "dotenv";
import express from 'express'
const endpointController = require("./controllers/controller")

dotenv.config();

const app = express(); 
const port = process.env.PORT

app.use(express.json())

app.use("/", endpointController)
app.get("/", (req, res) => {
    res.send("somehwer")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})