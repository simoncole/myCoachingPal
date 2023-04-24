import styles from '../../styles/Home.module.css';

export default function Replies({announcement}){
    if(announcement.replier){
        return (
            <div className={styles.replyWrapper}>
                <p><b>{announcement.replier} says:</b> {announcement.responseVal}</p>
            </div>
        )
    }
    else{
        return
    }
}