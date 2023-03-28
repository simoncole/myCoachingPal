import { useMutation } from "@tanstack/react-query"
import { baseServerUrl } from "..";
import styles from '../../styles/Home.module.css';

export default function WorkoutCompletion({workout}) {
    
    //When completed update wokout status
    //then show place for feedback

    const updateStatusFn = async (workoutID) => {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"workoutID": workoutID})
        }
        const res = await fetch(`${baseServerUrl}/updateWorkoutStatus`, options);
        return res.status;
    }

    const updateStatus = useMutation({
        mutationFn: (variables) => updateStatusFn(variables)
    })

    const handleClick = () => {
        updateStatus.mutate(workout.workoutID);
    }

    return(
        <div>
            <button onClick={handleClick}>Finished!</button>
        </div>
    )
}