export default function RosterList({rosterData}){

    return(
        <div>
            {
                rosterData.map((player, index) => (
                    <h2 key={index}>{player.username}</h2>
                ))
            }
        </div>
    );
}