
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
app.use(express.json())


  //get routes
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
        res.status(200).json(playerQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("there was an error");
    }
})

//athlete routes
app.get('/getAthleteData', async (req, res) => {
    try {
        const username = req.query.username;

        console.log(username)
        const queryString = `SELECT users.username, workouts.workoutID, workouts.workoutDescription, workouts.workoutDate, workouts.workoutStatus, users.team 
        FROM users 
        INNER JOIN workouts ON workouts.username=users.username 
        WHERE users.username=?;`;

        const [userQueryData] = await connection.execute(queryString, [username]);

        res.status(200).json(userQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("there was an error");
    }
})




//post routes
app.post("/postWorkout", async (req, res) => {
    try{
        const players = req.body.players;
        const workout = req.body.workout;
        //TODO add date that is submitted from frontend
        // const dateObj = new Date();
        // const date = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
        let date = req.body.date;
        date = date.slice(0, 10);
        console.log(players, workout, date);

        let postWorkoutQueryString = `INSERT INTO workouts(
            username,
            workoutDescription,
            workoutDate,
            workoutStatus
        )
        VALUES(
            ?, ?, ?, 0
        );`;
        postWorkoutQueryString = postWorkoutQueryString.replace(/(\r\n|\n|\r)/gm, "");
        //upload workout to db 
        for(let i = 0; i < players.length; i++){
            const dependencies = [players[i], workout, date];
            const [dbPostRes] = await connection.execute(postWorkoutQueryString, dependencies)              
            console.log(dbPostRes);
        }
        res.sendStatus(201);
    }
    catch(err){
        console.error(err);
        res.sendStatus(424);
    }
})


app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})