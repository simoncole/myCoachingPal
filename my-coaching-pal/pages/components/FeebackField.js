import { useState } from "react";
import styles from '../../styles/Home.module.css';

export default function FeedbackField({updateStatus, workoutID, setWorkoutSubmitted}) {
    const [textAreaValue, setTextAreaValue] = useState("");

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handlSubmit = (event) => {
        //upload workout feedback to database and change status
        event.preventDefault();
        updateStatus.mutate({"workoutID":workoutID, "workoutFeedback":textAreaValue});
        setWorkoutSubmitted(true);
    }

    return(
        <div>
            <form onSubmit={handlSubmit}>
                <textarea 
                className={styles.workoutTextField}
                value={textAreaValue} 
                onChange={handleOnChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}