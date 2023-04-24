export default function Replies({announcement}){
    if(announcement.replier){
        return (
            <div>
                <p>{announcement.replier} says: {announcement.responseVal}</p>
            </div>
        )
    }
    else{
        return
    }
}