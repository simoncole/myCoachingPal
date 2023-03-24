import styles from "../../styles/Home.module.css";

export default function UncheckedRosterList({rosterData}){
    return(
        <div className={styles.rosterListWrapper}>
            <ul>
                {
                    rosterData.map((player, index) => (
                        <li className={styles.rosterValue} key={index}>
                            {player.username}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}