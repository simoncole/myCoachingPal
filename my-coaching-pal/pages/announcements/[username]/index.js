import { useQuery } from '@tanstack/react-query';
import { baseServerUrl } from '@/pages';
import styles from '../../../styles/Home.module.css';
import AnnnouncementsList from '@/pages/components/AnnouncementsList';
import CreateAnnouncement from '@/pages/components/CreateAnnouncement';

export default function Announcements({username}){
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
        <div>
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
                        <h2>Athlete</h2>
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