const express = require('express');

const port = 4000;
const app = express();

app.get("/", (req, res) => {
    res.send("Start of myCoachingPal backend!");
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})