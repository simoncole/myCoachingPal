import { useRouter } from "next/router";
import styles from "../../../../styles/Home.module.css"

export default function CoachPlayerPage(){
    const router = useRouter();
    const playerUsername = router.query.playerUsername;
    return(
        <h2>{playerUsername}</h2>
    );
}