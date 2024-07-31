import dotenv from "dotenv";
import express from 'express'

dotenv.config();

const app = express(); 
const port = process.env.PORT

app.use(express.json())


app.get("/", (req, res) => {
    res.send("somehwer")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})