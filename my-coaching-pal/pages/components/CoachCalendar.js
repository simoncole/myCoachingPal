import { useState } from "react";
import styles from "../../styles/Home.module.css";

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

export function getMonthName(monthNum) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    if (monthNum >= 0 && monthNum <= 11) {
      return months[monthNum];
    } else {
      return "Invalid month number";
    }
  }

export function getDaysForMonth(day, month) {
    const days = [];
    for(let i = 0; i < 28; i++){
        switch(month){
            case 1:
                if(day >= 28){
                    days.push(day);
                    day = 1;  
                }
                else{
                    days.push(day);
                    day++;
                }
                break; 
            case  8 || 3 || 5 || 10:
                if(day >= 30){
                    days.push(day);
                    day = 1;
                }
                else{
                    days.push(day);
                    day++;
                } 
                break;
            default:
                if(day >= 31){
                    days.push(day);
                    day = 1;
                }
                else{
                    days.push(day);
                    day++;
                } 
                break;
        }        
    }
    return days;
}

export function renderCalendar(days) {
    const rowsArr = [];
    for(let i = 0; i < 4; i++){
        rowsArr.push(
            <tr key={i}>{
                days.slice(i*7, (i*7)+7).map((day, index) => (
                    <td key={index} className={styles.calendarField}>{day}</td>
            ))    
            }</tr>
        )
    }
    return rowsArr;
} 