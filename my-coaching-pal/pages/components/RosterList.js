import Link from "next/link";
import { baseUrl } from "..";
import styles from "../../styles/Home.module.css";

export default function RosterList({rosterData, coachUsername}){

    return(
        <div className={styles.rosterListWrapper}>
            <h3 className={styles.subTitle}>Your Roster:</h3>
            {
                rosterData.map((player, index) => (
                    <Link className={styles.playerRosterLink} key={index} href={`${baseUrl}/coach/${coachUsername}/${player.username}`}>{player.username}</Link>
                ))
            }
        </div>
    );
}