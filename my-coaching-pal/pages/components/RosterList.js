import Link from "next/link";
import { useState } from "react";
import { baseUrl } from "..";
import styles from "../../styles/Home.module.css";

export default function RosterList({rosterData, coachUsername, isPlayerChecked, setIsPlayerChecked, createState}){

    const handleOnChange = (position) => {
        const updatedCheckedState = isPlayerChecked.map((checkStatus, index) => {
            if(index === position) return !checkStatus;
            else return checkStatus
        });
        setIsPlayerChecked(updatedCheckedState);
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
                    </ul>

                }
        </div>
    ); 
}