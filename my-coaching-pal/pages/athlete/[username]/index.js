import { baseServerUrl } from "@/pages";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import {Calendar} from 'react-calendar';
import styles from "../../../styles/Home.module.css";
import 'react-calendar/dist/Calendar.css';
import AthleteCalendar, { getMonthName } from "@/pages/components/AthleteCalendar";
import WorkoutDescription from "@/pages/components/WorkoutDescription";



export default function Athlete(){
    const dateInstance = new Date;
    const [selectedDate, setSelectedDate] = useState(dateInstance.getDate());
    const [selectedMonth, setSelectedMonth] = useState(getMonthName(dateInstance.getMonth()));
    //for now we are simplifying and assuming the selected year is always the current one
    const [selectedYear, setSelectedYear] = useState(dateInstance.getFullYear());

    const router = useRouter()
    const username = router.query.username;

    //get the user's data
    const userData = useQuery({
        queryKey: ["userData", username],
        queryFn: () => fetchUserData(username),
        enabled: !!username                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    });
    
    return(
        <div>
            {
                userData.data?
                <div className={styles.flexCenteredWrapper}>
                    <h2>{router.query.username}</h2>

                    <div className={styles.rowWrapper}>
                        <AthleteCalendar 
                        setSelectedDate={setSelectedDate}
                        setSelectedMonth={setSelectedMonth}
                        username={username}
                        year={selectedYear}
                        />
                        <div>
                            <WorkoutDescription
                            selectedDay={selectedDate}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            username={username}
                            />
                        </div>
                    </div>
                </div>
                :
                <h2>hold on</h2>
            }
        </div>

    );
}

const fetchUserData = async (username) => {
    const res = await fetch(`${baseServerUrl}/getAthleteData?username=${username}`);
    return await res.json();
}