import { useState } from "react";

export default function CreateWorkout(){
    const [createState, setCreateState] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");

    const handleNewWorkoutCreation = () => {
        setCreateState(true);
    }

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handleWorkoutSubmit = (event) => {
        event.preventDefault();

        //TODO upload workout to db for selected athletes
    }
    return(
        <div>
            {
                createState?
                    <form onSubmit={handleWorkoutSubmit}>
                        <textarea value={textAreaValue} onChange={handleOnChange}/>
                        <button type="submit">Create</button>
                    </form>
                :
                <button onClick={handleNewWorkoutCreation} type="submit">New Workout</button>
            }
        </div>
    )
}