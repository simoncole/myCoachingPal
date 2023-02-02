
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2/promise';

const port = 4000;
const app = express();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
    res.status(200).json({"data": "start of backend!"})
});

app.get("/verifyUser", async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    //query the database
    const queryString = "SELECT * FROM users WHERE username=?"
    try{
        const [rows, fields] = await connection.execute(queryString, [username]);
        //verify the data matches and return their role
        if(rows[0].username === username && rows[0].password === password){
            res.status(200).json({"role": rows[0].role});
        }
        else res.status(200).json({"role": "unverified"});
        
    }
    catch(err){
        if(err.message = "Cannot read properties of undefined (reading 'username')"){
            res.status(200).json({"role": "unverified"})
        }
        res.status(500).json({"error": err.message});
    }
    
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})