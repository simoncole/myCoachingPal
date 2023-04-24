import { useQuery, useQueryClient } from '@tanstack/react-query';
import { baseServerUrl } from '@/pages';
import styles from '../../../styles/Home.module.css';
import AnnnouncementsList from '@/pages/components/AnnouncementsList';
import CreateAnnouncement from '@/pages/components/CreateAnnouncement';
import AnnnouncementsListAthlete from '@/pages/components/AnnnouncementsListAthlete';

export default function Announcements({username}){
    const queryClient = useQueryClient();
    //fetch the announcements for the user
    const fetchAnnouncements = async (username) => {
        const res = await fetch(`${baseServerUrl}/getAnnouncements?username=${username}`);
        return await res.json();
    }

    const announcements = useQuery({
        queryKey: ["getAnnouncements", username],
        queryFn: () => fetchAnnouncements(username)
    });

    announcements.data && console.log(announcements.data);
    if(announcements.isLoading) return <div>Loading...</div>;
    else if(announcements.isError) return <div>Error</div>;
    else return (
        <div className={styles.announcementPageWrapper}>
            <h1>Announcements for {announcements.data.team}</h1>
            {
                announcements.data.role === "coach" ? 
                    <div>
                        <CreateAnnouncement
                        username={username}
                        announcementsObj={announcements}
                        />
                        <AnnnouncementsList
                        announcements={announcements.data.announcements}
                        />
                    </div>
                :
                    <div>
                        <AnnnouncementsListAthlete
                        username={username}
                        announcements={announcements.data.announcements}
                        queryClient={queryClient}
                        />

                    </div>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    const {username} = context.query;

    return {
        props: {
            username
        }
    }
}