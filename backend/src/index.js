
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2/promise';

const port = 4000;
const app = express();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
    const [rows, fields] = await connection.execute("SELECT * FROM users;");
    
    console.log(rows);
    res.send("Start of myCoachingPal backend!");
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})