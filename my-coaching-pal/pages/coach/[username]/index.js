import CoachCalendar from "@/pages/components/CoachCalendar";
import CreateWorkout from "@/pages/components/CreateWorkout";
import UncheckedRosterList from "@/pages/components/UncheckedRosterList";
import RosterList from "@/pages/components/RosterList";
import { isError, useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { baseUrl, baseServerUrl } from "../.."
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Coach(){
    const router = useRouter();

    //state for the text area of the CreateWorkout component
    const [textAreaValue, setTextAreaValue] = useState("");
    //state for the selected players on the roster in RosterList component
    const [isPlayerChecked, setIsPlayerChecked] = useState([]);
    //state for when create workout button is pushed
    const [createState, setCreateState] = useState(false);
    //state that detects when submit is pushed, triggers useEffect
    const [workoutSubmitState, setWorkoutSubmitState] = useState(false);
    //state that holds the selected date for the workout
    const [startDate, setStartDate] = useState(new Date());


    const useQueryDependencies = {
        "router": router,
        "setIsPlayerChecked": setIsPlayerChecked
    }
    const rosterData = useQuery({
        queryKey: ["getRoster", useQueryDependencies],
        queryFn:  () => rosterFetch(useQueryDependencies.router),
        onSuccess: (data) => setCheckedOnSuccess(data, useQueryDependencies.setIsPlayerChecked) 
    });

    const postWorkout = useMutation({
        mutationFn: (variables) => postWorkoutFn(variables.players, variables.workout, variables.date)
    })

    //triggers when new workout is submitted and submits to db
    useEffect(() => {
        if(workoutSubmitState){
            //get which players are selected
            const players = [];
            for(let i = 0; i < rosterData.data.length; i++){
                if(isPlayerChecked[i]) players.push(rosterData.data[i].username);
            }
            
            postWorkout.mutate({
                "players": players,
                "workout": textAreaValue,
                "date": startDate
            })

        }
        setWorkoutSubmitState(false)
        setCreateState(false)
    }, [workoutSubmitState]);

    return(
        <div className={styles.flexCenteredColumnWrapper}>
            <h2 className={styles.title}>Hello, {router.query.username}</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "start"}}>
                <div className={styles.flexCenteredColumnWrapper} style={{padding: '1rem'}}>
                    <h3 className={styles.subTitle}>Your Roster</h3>
                        <CreateWorkout
                        textAreaValue={textAreaValue} 
                        setTextAreaValue={setTextAreaValue}
                        createState={createState}
                        setCreateState={setCreateState}
                        isPlayerChecked={isPlayerChecked}
                        setWorkoutSubmitState={setWorkoutSubmitState}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        />
                        {
                            rosterData.data?
                                createState?
                                    <RosterList 
                                    isPlayerChecked={isPlayerChecked}
                                    setIsPlayerChecked={setIsPlayerChecked}
                                    rosterData={rosterData.data} 
                                    coachUsername={router.query.username}
                                    createState={createState}
                                    />
                                :
                                    <UncheckedRosterList rosterData={rosterData.data}/>
                            :
                                rosterData.isLoading?
                                    <h2>hold on...</h2>
                                :
                                isError?
                                    <h2>There was an error</h2>
                                    :
                                        <></>
                        }
                </div>
                <div style={{padding: '1rem'}}>
                    <CoachCalendar/>
                </div>

            </div>
        </div>
    )
}

const rosterFetch = async (router) => {
    const { username } = await router.query;
    if(username){
        const res = await fetch(baseServerUrl + `/getRoster/?username=${username}`);
        return await res.json();
    }
    return null;
}

const setCheckedOnSuccess = (data, setIsPlayerChecked) => {
    setIsPlayerChecked(new Array(data.length).fill(false));
    return;
}

const postWorkoutFn = async (players, workout, date) => {
    const data = JSON.stringify({
        "players": players,
        "workout": workout,
        "date": date
    })
    const res = await fetch(`${baseServerUrl}/postWorkout`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
    return res.status;
}