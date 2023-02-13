import { useState } from "react";

export default function CreateWorkout({textAreaValue, setTextAreaValue}){
    const [createState, setCreateState] = useState(false);

    const handleNewWorkoutCreation = () => {
        setCreateState(true);
    }

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handleWorkoutSubmit = (event) => {
        event.preventDefault();
        //TODO upload workout to db for selected athletes
        alert(textAreaValue)
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