import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import CalendarContents from "./CalendarContents";
import { daysOfWeek } from "./CoachCalendar";


export default function AthleteCalendar({setSelectedDate, setSelectedMonth}) {
    const [date, setDate] = useState(getNearestSunday());
    // const [selectedDate, setSelectedDate] = useState(new Date().getDay());

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

    const renderCalendar = (days) => {
        const rowsArr = [];

        const handleClick = (day) => {
            let month = getMonthOnCalendar(day, days);
            setSelectedMonth(month);
            setSelectedDate(day);
        }

        for(let i = 0; i < 4; i++){
            rowsArr.push(
                <tr key={i}>{
                    days.slice(i*7, (i*7)+7).map((day, index) => (
                        <CalendarContents 
                        key={index}
                        handleClick={handleClick}
                        />
                ))    
                }</tr>
            )
        }
        return rowsArr;
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
                    {renderCalendar(
                        getDaysForMonth(date.getDate(), date.getMonth())).map((row) => (
                        row
                        )
                    )}

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

export const getMonthOnCalendar = (dayTarget, days) => {
    //iterate over days from current day, if you hit 1 then month++
    //else it's current month
    //if not found, it's the month before

    const dateInstance = new Date();
    let currentMonth = dateInstance.getMonth();
    for(let i = 0; i < days.length; i++){
        if(days[i] === 1) currentMonth++;
        if(days[i] === dayTarget) return getMonthName(currentMonth);
    }
    
    return getMonthName(--currentMonth);
} 