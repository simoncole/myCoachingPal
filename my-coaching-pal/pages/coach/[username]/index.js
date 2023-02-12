import CoachCalendar from "@/pages/components/CoachCalendar";
import CreateWorkout from "@/pages/components/CreateWorkout";
import RosterList from "@/pages/components/RosterList";
import { isError, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { baseUrl, baseServerUrl } from "../.."
import styles from "../../../styles/Home.module.css";

export default function Coach(){
    const router = useRouter();
    const rosterData = useQuery({
        queryKey: ["getRoster", router],
        queryFn:  () => rosterFetch(router)
    });

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h2 className={styles.title}>Hello, {router.query.username}</h2>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CreateWorkout/>
                {
                    rosterData.data?
                        <RosterList rosterData={rosterData.data} coachUsername={router.query.username}/>
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