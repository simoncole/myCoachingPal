import {useQuery} from '@tanstack/react-query';
import { baseServerUrl } from '..';

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

    return(
        <div>
            <h1>Coach Workout Feedback</h1>
            {
                feedbackQuery.data?
                    feedbackQuery.data.map((workout, index) => {
                        return(
                            <div key={index}>
                                <h2>{workout.workoutDescription}</h2>
                            </div>       
                        )
                    }
                )
                :
                    feedbackQuery.isLoading?
                        <h2>hold on...</h2>
                    :
                        <h2>There was an error</h2>

            }
        </div>
    )
}