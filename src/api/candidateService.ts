import {Candidate} from "../components/HomePage/HomePage";
import {db} from "./firebase/firestore";
import {
    collection,
    onSnapshot,
    Unsubscribe
} from '@firebase/firestore';

export const subscribeToCandidateList = (
    onChange: (items: Candidate[]) => void,
): Unsubscribe => {
    return onSnapshot(collection(db, 'candidates'), (col) => {
        onChange(
            col.docs.map((doc) => {
                console.log(doc.data())
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            }) as Candidate[]
        );
    });
};
