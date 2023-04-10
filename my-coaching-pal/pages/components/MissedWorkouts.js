import MissedWorkoutsList from "./MissedWorkoutsList";
import { useQuery, useMutation } from "@tanstack/react-query";
import { baseServerUrl } from "..";
import styles from "../../styles/Home.module.css";
import { reformatDate } from "./FeedbackList";

export default function MissedWorkouts({username}){

    const getMissedWorkouts = async (username) => {
        const res = await fetch(baseServerUrl + `/getMissedWorkouts/?username=${username}`);
        return await res.json();
    }
    
    const missedWorkouts = useQuery({
        queryKey: ["getMissedWorkouts", username],
        queryFn: () => getMissedWorkouts(username)
    })

    const updateDismissalFn = async (workoutID) => {
        const res = await fetch(`${baseServerUrl}/dismissWorkout?workoutID=${workoutID}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return res.status;
    }

    const updateDismissal = useMutation({
        mutationFn: (variables) => updateDismissalFn(variables.workoutID)
    })
    

    return(
        <div>
            <h1 style={{"paddingTop": "2rem"}} className={styles.subTitle}>Uncompleted Workouts</h1>
            {
                missedWorkouts.data?
                <div className={styles.scrollingFieldContainer}>
                    <MissedWorkoutsList
                    workouts={reformatDate(missedWorkouts.data)}
                    updateDismissal={updateDismissal}
                    />
                </div>
                :
                    missedWorkouts.isLoading?
                        <h2>hold on...</h2>
                        :
                            <h2>There was an error</h2>
            }
        </div>
    )
}