import Link from "next/link";
import { useState } from "react";
import { baseUrl } from "..";
import styles from "../../styles/Home.module.css";

export default function RosterList({rosterData, coachUsername}){
    const [isPlayerChecked, setIsPlayerChecked] = useState(new Array(rosterData.length).fill(false));

    const handleOnChange = (position) => {
        const updatedCheckedState = isPlayerChecked.map((checkStatus, index) => {
            if(index === position) return !checkStatus;
            else return checkStatus
        });
        setIsPlayerChecked(updatedCheckedState);
    }

    const handleSubmit = () => {
        const submittedPlayers = [];
        for(let i = 0; i < isPlayerChecked.length; i++){
            if(isPlayerChecked[i]) submittedPlayers.push(rosterData[i])
        }
        //TODO: post workout to database

        //refill slections as blank 
        setIsPlayerChecked(new Array(rosterData.length).fill(false));

    }

    return(
        <div className={styles.rosterListWrapper}>
            <h3 className={styles.subTitle}>Your Roster:</h3>
                {
                    <ul>{
                        rosterData.map((player, index) => (
                            <li key={index}>
                                <input 
                                type="checkbox"
                                id={index}
                                checked={isPlayerChecked[index]}
                                onChange={() => handleOnChange(index)}
                                />
                                {player.username}
                            </li>
                        ))
                        }
                        <button onClick={handleSubmit}>Submit</button>
                    </ul>

                }
        </div>
    ); 
}