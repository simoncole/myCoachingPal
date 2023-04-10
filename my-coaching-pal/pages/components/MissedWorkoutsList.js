import reformatDate from './MissedWorkoutsList';
import styles from '../../styles/Home.module.css';
import { useEffect, useMemo, useState } from 'react';

export default function MissedWorkoutsList({ workouts, updateDismissal }) {

    const handleDismiss = (workout) => {
        //update workout in db to be dismissed
        updateDismissal.mutate({ workoutID: workout.workoutID });
        workout.dismissedStatus = 1;
    }

    return (
        <div>
            {
            workouts.map((workout, index) => {
                return (
                    !workout.dismissedStatus &&
                    <div className={styles.flexLeftContainer} key={index}>
                        <div>
                            <p><b>{workout.username + ": "}</b>{workout.workoutDate}</p>
                            <p><b>Workout Description:</b> {workout.workoutDescription}</p>
                        </div>
                        <button className={styles.dismissButton}
                         onClick={() => handleDismiss(workout)}>
                            Dismiss
                        </button>
                    </div>
                )
            })
            }
        </div>
    );
}