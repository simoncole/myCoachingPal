import styles from '../../styles/Home.module.css';
import { useMutation } from '@tanstack/react-query';
import { baseServerUrl } from '..';
import { useState } from 'react';
import Replies from './Replies';

export default function AnnnouncementsListAthlete({announcements, username, queryClient}) {
    const [replyValue, setReplyValue] = useState("");
    const [replyIDState, setReplyIDState] = useState(-1);

    const dismissAnnouncementFn = async (ID) => {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await fetch(`${baseServerUrl}/dismissAnnouncement?ID=${ID}`, options);
        return await res.json();
    }

    const dismissAnnouncement = useMutation({
        mutationFn: (variables) => dismissAnnouncementFn(variables.ID)
    })

    const postReplyFn = async (reply, ID) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body: reply,
                announcementID: ID,
                creator: username
            })
        }
        const res = await fetch(`${baseServerUrl}/postReply`, options);
        return res.status;
    };

    const postReply = useMutation({
        mutationFn: (variables) => postReplyFn(variables.reply, variables.ID),
        onSuccess: () => {
            queryClient.invalidateQueries("getAnnouncements");
        }
    })

    const handleClick = (ID, index) => {
        //change status in db
        dismissAnnouncement.mutate({ID: ID});
        announcements[index].status = 1;
    }

    const handleReplyClick = (ID) => {
        setReplyIDState(ID);
    }

    const submitReply = (event, index) => {
        event.preventDefault();
        postReply.mutate({reply: replyValue, ID: announcements[index].ID});
        setReplyIDState(-1);
    }


    return (
        <div>
            <ul className={styles.flexCenteredWrapper}>
                {
                    announcements.map((announcement, index) => {
                        return (
                            announcement.status === 0 &&
                            <li
                             key={index}
                             className={styles.announcementListItem}
                             >
                                <h2>{announcement.title}</h2>
                                <p>{announcement.body}</p>
                                <Replies 
                                announcement={announcement}
                                />
                                <div id={styles.annoucementButtonsWrapper}>
                                    <button 
                                    onClick={() => handleClick(announcement.ID, index)}
                                    className={styles.dismissAnnouncementButton}
                                    >Dismiss</button>
                                    <button
                                    className={styles.replyButton}
                                    onClick={() => handleReplyClick(announcement.ID)}
                                    >Reply</button>
                                </div>
                                {
                                    replyIDState === announcement.ID ?
                                    <div>
                                        <form 
                                        className={styles.announcementFormWrapper}
                                        onSubmit={(event) => submitReply(event, index)}>
                                            <textarea value={replyValue}
                                            className={styles.replyField}
                                            onChange={(e) => setReplyValue(e.target.value)}
                                            >
                                                Write your reply here
                                            </textarea>
                                            <button
                                            className={styles.submitReplyButton}
                                             type="submit">Submit</button>
                                        </form>
                                    </div>
                                    :
                                    null
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}