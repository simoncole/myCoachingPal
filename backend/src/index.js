const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const port = 4000;
const testKey = process.env.TEST;
const app = express();

app.get("/", (req, res) => {
    console.log(testKey);
    res.send("Start of myCoachingPal backend!");
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})