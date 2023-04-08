import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { baseServerUrl } from "..";
import styles from '../../styles/Home.module.css';
import FeedbackField from "./FeebackField";

export default function WorkoutCompletion({workout, setWorkoutSubmitted}) {
    //for when workout is completely finsished
    const [workoutFinishedButtonState, setWorkoutFinishedButtonState] = useState(workout.workoutStatus);

    //then show place for feedback

    const updateStatusFn = async (workoutID, workoutFeedback) => {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "workoutID": workoutID,
                "workoutFeedback": workoutFeedback
            })
        }
        const res = await fetch(`${baseServerUrl}/updateWorkoutStatusFeedback`, options);
        return res.status;
    }

    const updateStatus = useMutation({
        mutationFn: (variables) => updateStatusFn(variables.workoutID, variables.workoutFeedback),
    })

    const handleClick = () => {
        setWorkoutFinishedButtonState(true);
        // updateStatus.mutate(workout.workoutID);
    }

    return(
        
        <div>
            {
                workoutFinishedButtonState?
                    <FeedbackField
                    updateStatus={updateStatus}
                    workoutID={workout.workoutID}
                    setWorkoutSubmitted={setWorkoutSubmitted}
                    />
                :
                    <button onClick={handleClick}>Finished!</button>
            }
        </div>
    )
}