import {useMutation, useQuery} from '@tanstack/react-query';
import { baseServerUrl } from '..';
import FeedbackList from './FeedbackList';
import styles from '../../styles/Home.module.css';

export default function CoachWorkoutFeedback({username}){
    //query to fetch the workouts that have been completed that haven't been dismissed
    const fetchRecentlyCompletedWorkouts = async (username) => {
        const res = await fetch(`${baseServerUrl}/getRecentlyCompletedWorkouts?username=${username}`);
        return await res.json();
    }

    const feedbackQuery= useQuery({
        queryKey: ["getRecentlyCompletedWorkouts", username],
        queryFn: () => fetchRecentlyCompletedWorkouts(username),
    });

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

    //Querty to update the workout status to dismissed
    const updateDismissal = useMutation({
        mutationFn: (variables) => updateDismissalFn(variables.workoutID),
    })

    return(
        <div>
            <h1 style={{"paddingTop": "2rem"}} className={styles.subTitle}>Recent Feedback</h1>
            {
                feedbackQuery.data?
                    <div className={styles.scrollingFieldContainer}>
                        <FeedbackList
                        workouts={feedbackQuery.data}
                        updateDismissal={updateDismissal}
                        />
                    </div>
                :
                    feedbackQuery.isLoading?
                        <h2>hold on...</h2>
                    :
                        <h2>There was an error</h2>

            }
        </div>
    )
}