import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function CreateWorkout({textAreaValue, setTextAreaValue, createState, setCreateState, isPlayerChecked, setWorkoutSubmitState, startDate, setStartDate}){

    const handleNewWorkoutCreation = () => {
        setCreateState(true);
    }

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handleWorkoutSubmit = (event) => {
        event.preventDefault();
        //TODO upload workout to db for selected athletes
        setWorkoutSubmitState(true);
    }   
    return(
        <div>
            {
                createState?
                    <div>

                        <form onSubmit={handleWorkoutSubmit}>
                            <textarea value={textAreaValue} onChange={handleOnChange}/>
                            <button type="submit">Create</button>
                        </form>
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)} 
                        dateFormat="yyyy-MM-dd"
                        />
                    </div>
                :
                <button onClick={handleNewWorkoutCreation} type="submit">New Workout</button>
            }
        </div>
    )
}