import { useEffect, useState } from "react";
import { getMonthName } from "./AthleteCalendar";

export default function WorkoutDescription({userData, selectedDay, selectedMonth}) {
    // const [workouts, setWorkouts] = useState([])

    const workouts = getWorkoutsToday(userData, selectedDay, selectedMonth);

    

    return(
        <div>
            <h2>Workouts on {selectedMonth + " " + selectedDay}:</h2>
            {
                workouts.map((workout, index) => (
                    <h3 key={index}>{workout.workoutDescription}</h3>
                ))
            }
            
        </div>

    );
}

export const getWorkoutsToday = (userData, selectedDay, selectedMonth) => {
    console.log(selectedDay)
    console.log(selectedMonth)
    const workoutsToday = [];
    const workouts = userData.data;


    for(let i = 0; i < workouts.length; i++){
        const workoutDay = workouts[i].workoutDate.slice(8, 10);
        const workoutMonth = workouts[i].workoutDate.slice(5, 7)

        if(workoutDay.charAt(0) === '0') workoutDay = workoutDay.slice(1);
        if(workoutMonth.charAt(0) === '0') workoutMonth = workoutMonth.slice(1); 
        workoutMonth = Number(workoutMonth);
        workoutMonth--;
        workoutMonth = getMonthName(workoutMonth);


        if((String(selectedDay) === workoutDay) && (workoutMonth === selectedMonth)){
            workoutsToday.push(workouts[i]);
        }
    }
    return workoutsToday
}