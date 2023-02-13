import CoachCalendar from "@/pages/components/CoachCalendar";
import CreateWorkout from "@/pages/components/CreateWorkout";
import UncheckedRosterList from "@/pages/components/UncheckedRosterList";
import RosterList from "@/pages/components/RosterList";
import { isError, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { baseUrl, baseServerUrl } from "../.."
import styles from "../../../styles/Home.module.css";
import { useState } from "react";

export default function Coach(){
    const router = useRouter();

    //state for the text area of the CreateWorkout component
    const [textAreaValue, setTextAreaValue] = useState("");
    //state for the selected players on the roster in RosterList component
    const [isPlayerChecked, setIsPlayerChecked] = useState([]);
    //state for when create workout button is pushed
    const [createState, setCreateState] = useState(false);

    const useQueryDependencies = {
        "router": router,
        "setIsPlayerChecked": setIsPlayerChecked
    }
    const rosterData = useQuery({
        queryKey: ["getRoster", useQueryDependencies],
        queryFn:  () => rosterFetch(useQueryDependencies.router),
        onSuccess: (data) => setCheckedOnSuccess(data, useQueryDependencies.setIsPlayerChecked) 
    });

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h2 className={styles.title}>Hello, {router.query.username}</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CreateWorkout
                textAreaValue={textAreaValue} 
                setTextAreaValue={setTextAreaValue}
                createState={createState}
                setCreateState={setCreateState}
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
                <CoachCalendar/>
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