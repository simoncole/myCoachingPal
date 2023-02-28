import { baseServerUrl } from "@/pages";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Athlete(){
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
            <h2>Athlete page</h2>
            <h2>{router.query.username}</h2>
            {
                userData.data?
                <h2>{userData.data[0].workoutDescription}</h2>
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