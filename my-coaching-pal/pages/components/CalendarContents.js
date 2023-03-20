import yellowCircle from "../../public/yellowCircle.png"
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { getWorkoutsToday } from "./WorkoutDescription";

export default function CalendarContents({day, handleClick}) {
    const workouts = getWorkoutsToday()
    return(
        <td onClick={() => handleClick(day)}>
            <div  className={styles.calendarField}>
                <h3 className={styles.calendarDate}>
                    {day}
                </h3>
                <div className={styles.calendarStatusIndicatorWrapper}>
                    <Image 
                    src={yellowCircle}
                    width={30}
                    height={30}
                    alt={"Yellow Circle Icon"}
                    />
                </div>
                
            </div>                    
        </td>
    )
}

