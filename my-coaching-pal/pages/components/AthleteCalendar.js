import { getMonthName, getDaysForMonth, renderCalendar } from "./CoachCalendar";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { daysOfWeek } from "./CoachCalendar";

export default function AthleteCalendar() {
    const [date, setDate] = useState(getNearestSunday());

    const renderHead = () => {
        const headers = [];
        let iterativeDate = date.getDay();
        for(let i  = 0; i < 7; i++){
            if(iterativeDate === 6){
                headers.push(daysOfWeek[iterativeDate]);
                iterativeDate = 0;
            }
            else{
                headers.push(daysOfWeek[iterativeDate])
                iterativeDate++;
            }
        }
        return headers;
      }
    

    return(
        <div className={styles.calendar}>
            <h2>{getMonthName(date.getMonth())}</h2>
            <table>
                <thead>
                    <tr>
                        {renderHead().map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar(getDaysForMonth(date.getDate(), date.getMonth())).map((row) => (
                        row
                    ))}    
                </tbody>
            </table>
        </div>
    );
}

export const getNearestSunday = () => {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
    return lastSunday;
}