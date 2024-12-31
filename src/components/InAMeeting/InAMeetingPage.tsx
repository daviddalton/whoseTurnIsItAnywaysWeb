import React from 'react';
import {Container} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import {changeMeetingStatus, subscribeToMeetingStatus} from "../../api/meetingService";

export interface MeetingStatus {
    id: string | undefined;
    inMeeting: boolean;
}

function InAMeetingPage() {

    const { user } = useAuth()
    const [meetingStatus, setMeetingStatus] = React.useState<MeetingStatus[]>([])

    React.useEffect(() => {
        if (meetingStatus.length < 1) {
            subscribeToMeetingStatus(setMeetingStatus);
        }
    }, [meetingStatus.length, user])

    function isOrIsNot(): string {
        if (user?.email === 'david@chaddalton.com' || user?.email === 'andreadalton18@gmail.com') {
            return meetingStatus[0]?.inMeeting ? "is" : "is not"
        }
        return "might be"
    }

    function changeStatus() {
        if (user?.email === 'david@chaddalton.com' || user?.email === 'andreadalton18@gmail.com') {
            changeMeetingStatus(!meetingStatus[0]?.inMeeting)
            return subscribeToMeetingStatus(setMeetingStatus)
        }
    }

    return (
        <div>
            <Container sx={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
                <h3 className={"status application-text"}>David <span className={"meeting-status"} onClick={changeStatus}>{isOrIsNot()}</span> in a meeting!</h3>
            </Container>
        </div>

    )
}

export default InAMeetingPage;