import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { getMonthName, getDaysForMonth, renderCalendar } from "./AthleteCalendar";


export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CoachCalendar(){
    const [date, setDate] = useState(new Date());

    const renderWeek = () => {
    //     const days = [];
    //     for (let i = 1; i <= 7; i++) {
    //     const day = new Date(date.getFullYear(), date.getMonth(), i);
    //     days.push(
    //         <td key={day}>
    //         {getDate()}
    //         </td>
    //     );
    // }
    // return <tr>{days}</tr>;
    // const day = new Date(date.getFullYear(), date.getMonth(), i)
    const days = getDaysForMonth(date.getDate(), date.getMonth());
    console.log(days);
  };
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
                {renderHead().map((day, index) => (
                    <th key={index}>{day}</th>
                ))}
                <tbody>
                    {renderCalendar(getDaysForMonth(date.getDate(), date.getMonth())).map((row) => (
                        row
                    ))}    
                </tbody>
            </table>
        </div>
    )
}

