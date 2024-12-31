import {db} from "./firebase/firestore";
import {
    collection,
    setDoc,
    doc,
    onSnapshot,
    Unsubscribe
} from '@firebase/firestore';
import {MeetingStatus} from "../components/InAMeeting/InAMeetingPage";

export const subscribeToMeetingStatus = (
    onChange: (status: MeetingStatus[]) => void,
): Unsubscribe => {
    return onSnapshot(collection(db, 'meetingStatus'), (col) => {
        onChange(
            col.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            }) as MeetingStatus[]
        );
    });
};

export const changeMeetingStatus = async (
    inMeeting: boolean
) => {
    await setDoc(doc(db, "meetingStatus", "davidStatus"), {
        inMeeting: inMeeting
    });
}