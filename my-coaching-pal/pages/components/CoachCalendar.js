import { useState } from "react";

export default function CoachCalendar(){
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelect = (day) => {
    setSelectedDate(day);
    };
    const renderWeek = () => {
        const days = [];
        for (let i = 1; i <= 7; i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i);
        days.push(
            <td key={day} onClick={() => handleSelect(day)}>
            {date.getDate()}
            </td>
        );
    }
    return <tr>{days}</tr>;
  };

    return(
        <div>
            <h2>{getMonthName(date.getMonth())}</h2>
            <table>
                {/* <thead> */}
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Wed</th>
                    <th>Thur</th>
                    <th>Fri</th>
                    <th>Sat</th>
                {/* </thead> */}
                <tbody>
                    {renderWeek()}
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
  