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
            <h2 className={styles.subTitleSmall}>Select athletes:</h2>
                {
                    <ul>{
                            rosterData.map((player, index) => (
                                    <li className={styles.rosterValue} key={index}>
                                        <input 
                                        style={{marginRight: '0.5rem'}}
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