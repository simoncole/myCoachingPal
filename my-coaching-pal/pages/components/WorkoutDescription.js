import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { baseServerUrl } from "..";
import { getMonthName } from "./AthleteCalendar";
import WorkoutCompletion from "./WorkoutCompletion";
import styles from '../../styles/Home.module.css';


//changing this component to make backend call that 
export default function WorkoutDescription({selectedDay, selectedMonth, selectedYear, username}) {
    // const [workouts, setWorkouts] = useState([])

    // const workouts = getWorkoutsToday(userData, selectedDay, selectedMonth);

    const fetchWorkoutsOnDate = async () => {
        const res = await fetch(`${baseServerUrl}/getWorkoutsOnDate?username=${username}&year=${selectedYear}&month=${selectedMonth}&day=${selectedDay}`);
        return res.json();
    }

    const selectedWorkoutsQueryKey = {
        selectedDay: selectedDay,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
        username: username
    };
    const selectedWorkouts = useQuery({
        queryKey: ["selectedWorkouts", selectedWorkoutsQueryKey],
        queryFn: () => fetchWorkoutsOnDate(selectedWorkoutsQueryKey),
        enabled: !!selectedWorkoutsQueryKey.selectedDay
    })

    
    if(selectedWorkouts.isLoading) return <h2>Workouts on {selectedMonth + " " + selectedDay + ", " + selectedYear}</h2>

    else if(selectedWorkouts.isError) return <h2>error</h2>
    else{
        return(
            <div>
                <h2>Workouts on {selectedMonth + " " + selectedDay + ", " + selectedYear}</h2>
                {
                    selectedWorkouts.data.map((workout, index) => (
                        <div key={index}>
                            <h3>{
                                workout.workoutDescription
                            }</h3>
                            <WorkoutCompletion  workout={workout}/>
                        </div>
                        
                    ))
                }
                
            </div>
    
        );
    }
}

// export const getWorkoutsToday = (userData, selectedDay, selectedMonth) => {
//     const workoutsToday = [];
//     const workouts = userData.data;


//     for(let i = 0; i < workouts.length; i++){
//         const workoutDay = workouts[i].workoutDate.slice(8, 10);
//         const workoutMonth = workouts[i].workoutDate.slice(5, 7)

//         if(workoutDay.charAt(0) === '0') workoutDay = workoutDay.slice(1);
//         if(workoutMonth.charAt(0) === '0') workoutMonth = workoutMonth.slice(1); 
//         workoutMonth = Number(workoutMonth);
//         workoutMonth--;
//         workoutMonth = getMonthName(workoutMonth);


//         if((String(selectedDay) === workoutDay) && (workoutMonth === selectedMonth)){
//             workoutsToday.push(workouts[i]);
//         }
//     }
//     return workoutsToday
// }

