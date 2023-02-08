import Link from "next/link";
import { baseUrl } from "..";

export default function RosterList({rosterData, coachUsername}){

    return(
        <div>
            <h3>Roster:</h3>
            {
                rosterData.map((player, index) => (
                    <Link key={index} href={`${baseUrl}/coach/${coachUsername}/${player.username}`}>{player.username}</Link>
                ))
            }
        </div>
    );
}