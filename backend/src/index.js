
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const port = 4000;
const app = express();

const connection = await mysql.createConnection(process.env.DATABASE_URL);


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, PUT, GET");
//     next();
//   });
app.use(cors());
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

        const queryString = `
        SELECT users.username, workouts.workoutID, workouts.workoutDescription, workouts.workoutDate, workouts.workoutStatus, users.team 
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

app.get('/getWorkoutsOnDate', async (req, res) => {
    try {
        const day = req.query.day;
        const month = req.query.month;
        const year = req.query.year;
        const username = req.query.username;

        const convertedDate = convertDate(day, month, year); 

        const queryString = `
        SELECT workoutDescription, workoutStatus, workoutDate, workoutID
        FROM workouts
        WHERE username=? AND workoutDate=?`;

        const [workoutQueryData] = await connection.execute(queryString, [username, convertedDate]);

        res.status(200).json(workoutQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("There was an error");
    }
})

//retrieve the status and date of a workout for the purpose of the status dot on the calendar
app.get('/workoutDotStatus', async (req, res) => {
    try{
        const day = req.query.day;
        const month = req.query.month;
        const year = req.query.year;
        const username = req.query.username;

        const convertedDate = convertDate(day, month, year);

        const queryString = `
        SELECT workoutStatus, workoutDate 
        FROM workouts 
        WHERE username=? AND workoutDate=?;`;

        const [workoutStatusData] = await connection.execute(queryString, [username, convertedDate])

        res.status(200).json(workoutStatusData);
    }
    catch(err){
        console.error(err);
    }
})

app.get('/getRecentlyCompletedWorkouts', async (req, res) => {
    try{
        const username = req.query.username;

        const queryString = `
            SELECT w.workoutDescription, w.workoutDate, w.workoutFeedback, u.username, w.workoutID, w.dismissedStatus
            FROM workouts w
            JOIN users u ON w.username = u.username
            WHERE u.team = (
                SELECT team
                FROM users
                WHERE username =?
                AND workoutStatus=1
                AND !dismissedStatus
                AND workoutDate >= CURDATE() - INTERVAL 14 DAY
            );
        `;


        const [workoutQueryData] = await connection.execute(queryString, [username]);
        console.log(username);

        res.status(200).json(workoutQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("There was an error");
    }
})

app.get('/getMissedWorkouts', async (req, res) => {
    try{
        const username = req.query.username;

        const queryString = `
        SELECT w.workoutDescription, w.workoutDate, u.username, w.workoutID, w.dismissedStatus
            FROM workouts w
            JOIN users u ON w.username = u.username
            WHERE u.team = (
                SELECT team
                FROM users
                WHERE username =?
                AND workoutStatus=0
                AND !dismissedStatus
                AND workoutDate < CURDATE()
                AND workoutDate >= CURDATE() - INTERVAL 14 DAY
            );`;

        const [workoutQueryData] = await connection.execute(queryString, [username]);

        res.status(200).json(workoutQueryData);
    }
    catch(err){
        console.error(err);
        res.status(500).json("There was an error");
    }
});

app.get('/getAnnouncements', async (req, res) => {
    try{

        //actually I think I just need to get all the data for the team no matter what
        const username = req.query.username;


        const teamQueryString = "SELECT team, role FROM users WHERE username=?";
        const [teamQueryData] = await connection.execute(teamQueryString, [username]);
        const team = teamQueryData[0].team;
        const role = teamQueryData[0].role;

        //get all the announcements for the team
        const announcementQueryString = `
            SELECT a.body AS body, a.title AS title, r.value AS responseVal, a.ID AS ID
            FROM Announcements a LEFT OUTER JOIN Responses r
            ON a.responseIDs = r.ID
            JOIN users u ON a.creator = u.username
            WHERE u.team = ? AND !a.status;
        `;

        const [announcementQueryData] = await connection.execute(announcementQueryString, [team]);

        const response = {
            announcements: announcementQueryData,
            role: role,
            team: team
        };

        res.status(200).json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).json("There was an error");
    }
});

//put routes
app.put('/updateWorkoutStatusFeedback', async (req, res) => {
    try{
        //update the workout status to 1 and update the feedback
        const workoutID = req.body.workoutID;
        const workoutFeedback = req.body.workoutFeedback;
        const queryString = `
        UPDATE workouts
        SET workoutStatus=1,
        workoutFeedback=?
        WHERE workoutID=?;`;

        const [sqlRes] = await connection.execute(queryString, [workoutFeedback, workoutID]);
        console.log(sqlRes);

        res.status(204);
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
});

app.put('/dismissWorkout', async (req, res) => {
    try{
        const workoutID = req.query.workoutID;
        const queryString = `
        UPDATE workouts
        SET dismissedStatus=1
        WHERE workoutID=?;`;

        const [sqlRes] = await connection.execute(queryString, [workoutID]);
        console.log(sqlRes);

        res.status(204);
    }
    catch(err){
        console.error(err);
        res.status(500);
    }
});

app.put('/dismissAnnouncement', async (req, res) => {
    try{
        const announcementID = req.query.ID;
        const queryString = `
        UPDATE Announcements
        SET status=1
        WHERE ID=?;`;

        const [sqlRes] = await connection.execute(queryString, [announcementID]);
        console.log(sqlRes);

        res.status(204);
    }
    catch(err){
        console.error(err);
        res.status(500);
    }

});

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

const convertDate = (day, month, year) => {
    const months = {
        January: '01',
        Febuary: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
      }
    
      const numMonth = months[month];
      return `${year}-${numMonth}-${day}`;
}