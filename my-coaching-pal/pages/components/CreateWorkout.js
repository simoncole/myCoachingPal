import { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Home.module.css";


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
                            <textarea className={styles.workoutTextField} value={textAreaValue} onChange={handleOnChange}/>
                            <div className={styles.flexCenteredWrapper}>
                                <h2 className={styles.subTitleSmall}>Select Date of Workout:</h2>
                                    <CalendarContainer className={styles.datePicker}>
                                        <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)} 
                                        dateFormat="yyyy-MM-dd"
                                        />
                                    </CalendarContainer>
                                    <button className={styles.submitNewWorkout} type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                :
                <button onClick={handleNewWorkoutCreation} type="submit" className={styles.newWorkoutButton}>New Workout</button>
            }
        </div>
    )
}