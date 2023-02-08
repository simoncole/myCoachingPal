
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2/promise';

const port = 4000;
const app = express();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", async (req, res) => {
    res.status(200).json({"data": "start of backend!"})
});

app.get("/verifyUser", async (req, res) => {
    console.log("something made it to verify user");
    const username = req.query.username;
    const password = req.query.password;

    //query the database
    const queryString = "SELECT * FROM users WHERE username=?"
    try{
        const [rows, fields] = await connection.execute(queryString, [username]);
        console.log(rows);
        //verify the data matches and return their role
        if(rows[0]){
            if(rows[0].username === username && rows[0].password === password){
                res.status(200).json({"role": rows[0].role});
            }
            else res.status(200).json({"role": "unverified"});
        }
        else res.status(200).json({"role": "unverified"});
    }
    catch(err){
        console.log(err.message);
        if(err.message = "Cannot read properties of undefined (reading 'username')"){
            res.status(200).json({"role": "unverified"})
        }

        res.status(500).json({"error": err.message});
    }
});

app.get('/getRoster', async (req, res) => {
    const username = req.query.username;

    try{
        //get players corresponding to team
        //return them as array
        const teamQueryString = "SELECT team FROM users WHERE username=?";
        const [teamQueryData] = await connection.execute(teamQueryString, [username]);
        const team = teamQueryData[0].team;

        const playerQueryString = "SELECT username FROM users WHERE role='player' AND TEAM=?";
        const [playerQueryData, fields] = await connection.execute(playerQueryString, [team]);
        console.log(playerQueryData);
        res.status(200).json(playerQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("there was an error");
    }
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})