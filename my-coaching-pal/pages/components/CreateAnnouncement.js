import { useMutation } from "@tanstack/react-query";
import styles from "../../styles/Home.module.css";
import { baseServerUrl } from "..";
import { useState } from "react";

export default function CreateAnnouncement({username, announcementsObj}){
    const [clickedStatus, setClickedStatus] = useState(false);
    const [bodyValue, setBodyValue] = useState("");
    const [titleValue, setTitleValue] = useState("");

    const postAnnouncementFn = async (title, body) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body, 
                creator: username
            })
        }
        const res = await fetch(`${baseServerUrl}/postAnnouncement`, options);
        return res.status;
    };

    const postAnnouncement = useMutation({
        mutationFn: (variables) => postAnnouncementFn(variables.title, variables.body),
        onSuccess: () => {
            console.log("made it")
            setClickedStatus(false);
            announcementsObj.refetch();
        }
    })


    const handleClick = () => {
        setClickedStatus(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postAnnouncement.mutate({title: titleValue, body: bodyValue});

    }

    return(
        <div className={styles.flexCenteredWrapper}>
            { 
                !clickedStatus ?
                <button className={styles.newWorkoutButton} onClick={handleClick}>Create Announcement</button>
                :
                <form 
                onSubmit={(event) => handleSubmit(event)}
                className={styles.announcementFormWrapper}
                >
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title"
                    onChange={(event) => setTitleValue(event.target.value)}
                    />
                    <label htmlFor="body">Body</label>
                    <textarea
                    name="body" 
                    value={bodyValue}
                    onChange={(event) => setBodyValue(event.target.value)}
                    className={styles.workoutTextField}
                    >
                        Enter Announcement Here
                    </textarea>
                    <button className={styles.submitAnnouncementButton} type="submit">Submit</button>
                </form>
            }
        </div>
    );
}