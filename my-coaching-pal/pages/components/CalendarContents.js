import styles from "../../styles/Home.module.css";
import { getWorkoutsToday } from "./WorkoutDescription";
import { useQuery } from "@tanstack/react-query";
import { baseServerUrl } from "..";
import CalendarStatusBubble from "./CalendarStatusBubble";

export default function CalendarContents({day, month, year, username, handleClick}) {
    
   const fetchWorkoutDotStaus = async () => {
        const res = await fetch(`${baseServerUrl}/workoutDotStatus?username=${username}&day=${day}&month=${month}&year=${year}`);
        return res.json();
   }

   const queryKeyDependencies = {
        day: day,
        month: month,
        year: year,
        username: username
   }

    const workoutToday = useQuery({
        queryKey: ["workoutToday", queryKeyDependencies],
        queryFn: fetchWorkoutDotStaus
    })

    if (workoutToday.data) return(
        <td onClick={() => handleClick(day)}>
            <div  className={styles.calendarField}>
                <h3 className={styles.calendarDate}>
                    {day}
                </h3>
                <CalendarStatusBubble
                workoutStatus={workoutToday.data}
                day={day}
                month={month}
                year={year}
                />
            </div>                    
        </td>
    )
    else{
        return <td></td>
    }
}

