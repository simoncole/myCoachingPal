import { baseServerUrl } from "@/pages";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import {Calendar} from 'react-calendar';
import styles from "../../../styles/Home.module.css";
import 'react-calendar/dist/Calendar.css';
import AthleteCalendar, { getMonthName } from "@/pages/components/AthleteCalendar";



export default function Athlete(){
    const dateInstance = new Date;
    const [selectedDate, setSelectedDate] = useState(dateInstance.getDate());
    const [selectedMonth, setSelectedMonth] = useState(getMonthName(dateInstance.getMonth()));

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
                <div>
                    <h2>Athlete page</h2>
                    <h2>{router.query.username}</h2>
                    <AthleteCalendar 
                    setSelectedDate={setSelectedDate}
                    setSelectedMonth={setSelectedMonth}
                    />
                    {userData.data.map((workout, index) => (
                        <div key={index}>
                            <h2>{workout.workoutDescription}</h2>
                            <h2>{workout.workoutDate}</h2>
                        </div>
                    ))}
                    <h2>Selected Date: {selectedMonth + " " + selectedDate}</h2>
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