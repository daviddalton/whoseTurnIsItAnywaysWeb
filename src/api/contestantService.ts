import {db} from "./firebase/firestore";
import {
    collection,
    setDoc,
    doc,
    onSnapshot,
    Unsubscribe
} from '@firebase/firestore';
import {Contestant} from "../components/StillInPage/StillInPage";

export const subscribeToContestantList = (
    onChange: (items: Contestant[]) => void,
): Unsubscribe => {
    return onSnapshot(collection(db, 'contestants'), (col) => {
        onChange(
            col.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            }) as Contestant[]
        );
    });
};

export const increaseContestantPushUps = async (
    contestant: Contestant,
    pushUpsCompleted: number
) => {
    await setDoc(doc(db, "contestants", contestant.id as string), {
        name: contestant.name,
        isStillIn: contestant.isStillIn,
        totalPushUps: contestant.totalPushUps + pushUpsCompleted
    });
}