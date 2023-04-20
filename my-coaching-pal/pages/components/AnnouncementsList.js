import styles from '../../styles/Home.module.css';
import { useMutation } from '@tanstack/react-query';
import { baseServerUrl } from '..';

export default function AnnnouncementsList({announcements}){
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

    const handleClick = (ID, index) => {
        //change status in db
        dismissAnnouncement.mutate({ID: ID});
        announcements[index].status = 1;
    }


    return (
        <div>
            <h1>Announcements</h1>
            <ul>
                {
                    announcements.map((announcement, index) => {
                        return (
                            announcement.status === 0 &&
                            <li key={index}>
                                <h2>{announcement.title}</h2>
                                <p>{announcement.body}</p>
                                <button onClick={() => handleClick(announcement.ID, index)}>Dismiss</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}