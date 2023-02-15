import {Candidate} from "../components/HomePage/HomePage";
import {db} from "./firebase/firestore";
import {
    collection,
    setDoc,
    doc,
    onSnapshot,
    Unsubscribe
} from '@firebase/firestore';

export const subscribeToCandidateList = (
    onChange: (items: Candidate[]) => void,
): Unsubscribe => {
    return onSnapshot(collection(db, 'candidates'), (col) => {
        onChange(
            col.docs.map((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            }) as Candidate[]
        );
    });
};

export const increaseUserCounts = async (
    candidate: Candidate,
    dollarsSpent: number
) => {
    await setDoc(doc(db, "candidates", candidate.id as string), {
        name: candidate.name,
        timesPayed: candidate.timesPayed + 1,
        totalDollarsSpent: candidate.totalDollarsSpent + dollarsSpent
    });
}


