import styles from "../../styles/Home.module.css";

export default function UncheckedRosterList({rosterData}){
    return(
        <div className={styles.rosterListWrapper}>
            <h3 className={styles.subTitle}>Your Roster:</h3>
            <ul>
                {
                    rosterData.map((player, index) => (
                        <li key={index}>
                            {player.username}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}