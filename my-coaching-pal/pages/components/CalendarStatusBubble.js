import styles from "../../styles/Home.module.css";
import yellowCircle from "../../public/yellowCircle.png";
import greenCircle from "../../public/greenCircle.png";
import redCircle from "../../public/redCircle.png";

import Image from "next/image";


export default function CalendarStatusBubble({workoutStatus, day, month, year}){
    /*
    in the past and not completed: red dot
    in the past and completed: green dot
    in the future and not completed: yellow dot
    in the future and no workout: no dot
    */

    const dotColor = getDotColor(workoutStatus, day, month, year);
    // console.log(dotColor)
    switch(dotColor){
        case "green":
            return(
                <div className={styles.calendarStatusIndicatorWrapper}>
                    <Image 
                    src={greenCircle}
                    width={30}
                    height={30}
                    alt={"Green Circle Icon"}
                    />
                </div>
            );
        case "yellow":
            return(
                <div className={styles.calendarStatusIndicatorWrapper}>
                    <Image 
                    src={yellowCircle}
                    width={30}
                    height={30}
                    alt={"Yellow Circle Icon"}
                    />
                </div>
            );
        case "red":
            return(
                <div className={styles.calendarStatusIndicatorWrapper}>
                    <Image 
                    src={redCircle}
                    width={30}
                    height={30}
                    alt={"Red Circle Icon"}
                    />
                </div>
            );
        default:
            return(
                <></>
            )
    }

    // return(
    //     <div className={styles.calendarStatusIndicatorWrapper}>
    //         <Image 
    //         src={yellowCircle}
    //         width={30}
    //         height={30}
    //         alt={"Yellow Circle Icon"}
    //         />
    //     </div>
    // );
}

const getDotColor = (workoutStatus, day, month, year) => {
    let dateToday = new Date();
    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();
    const dayToday= dateToday.getDate();
    const convertedDate = convertDate(day, month, year);
    // console.log(workoutStatus)

    //portion after should only be done if there is at least one workout on the date
    let workoutOnDateStatus = false;
    for(let i = 0; i < workoutStatus.length; i++){
        if(workoutStatus[i].workoutDate.slice(0, 10) === convertedDate) workoutOnDateStatus = true;
    }
    if(workoutOnDateStatus){
        let dotColor;

        //determine wheter it is before or after today
        //after 
        if(year > yearToday){
            dotColor = calculateDotColor(checkCompletion(workoutStatus), "after");
        }
        //year is before so before
        else if(year < yearToday){
            dotColor = calculateDotColor(checkCompletion(workoutStatus), "before");
        }
        //years are equal
        else{
            //month is after so after
            if(month > monthToday){
                dotColor = calculateDotColor(checkCompletion(workoutStatus), "after");
            }
            //month is before so before
            else if(month < monthToday){
                dotColor = calculateDotColor(checkCompletion(workoutStatus), "before");
            }
            //months are equal
            else{
                //day before
                if(day < dayToday){
                    dotColor = calculateDotColor(checkCompletion(workoutStatus), "before");
                }
                //day must be equal or after
                else{
                    dotColor = calculateDotColor(checkCompletion(workoutStatus), "after");
                }
            }   
        }
        return dotColor;
    }
    else{
        return "none";
    }
}

const checkCompletion = (workoutStatus) => {
    //if all workouts are completed return true
    for(let i = 0; i < workoutStatus.length; i++){
        if(!workoutStatus[i].workoutStatus) return false;
    }
    return true;
}

export const convertDate = (day, month, year) => {
    const months = {
        January: '01',
        Febuary: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
      }
    
      const numMonth = months[month];
      return `${year}-${numMonth}-${day}`;
}

const calculateDotColor = (completionStatus, chronologicalPlacement) => {
    /*
    in the past and not completed: red dot
    in the past and completed: green dot
    in the future and not completed: yellow dot
    in the future and no workout: no dot
    */   
   switch(chronologicalPlacement){
    case "before": 
        if(completionStatus) return "green";
        else return "red";
    case "after":
        if(completionStatus) return "green";
        else return "yellow";
    default:
        console.error("Invalid chronological placemenet: " + chronologicalPlacement);
        return "none"
   }
}