import { useEffect } from "react"
import styles from "../../styles/Home.module.css";


export default function FeedbackList({workouts, updateDismissal}){

    workouts = reformatDate(workouts);

    const handleDismiss = (workout) => {
        //update workout in db to be dismissed
        updateDismissal.mutate({workoutID: workout.workoutID});
        workout.dismissedStatus = 1;
    }

    return(
        <div>
            {
                workouts.map((workout, index) => {
                    return(
                        !workout.dismissedStatus &&
                        <div className={styles.flexLeftContainer} key={index}>
                            <div id={styles.feedbackContentWrapper}>
                                <p className={styles.text}>
                                    <b>
                                    {
                                        workout.username + ": "
                                    }
                                    </b>
                                    { 
                                        workout.workoutDescription + " Date: " +
                                        workout.workoutDate
                                    }
                                </p>
                                <p className={styles.text}><b>Feedback:</b> {workout.workoutFeedback}</p>
                            </div>
                            <div id={styles.dismissButtonWrapper}>
                                <button onClick={() => handleDismiss(workout)} className={styles.dismissButton}>Dismiss</button>
                            </div>
                        </div>       

                    )
                }
                )
            }
        </div>
    )
}

export function reformatDate(workouts){
    workouts.forEach(workout => {
        const date = new Date(workout.workoutDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        workout.workoutDate = `${month}/${day}/${year}`;
    })
    return workouts;
}