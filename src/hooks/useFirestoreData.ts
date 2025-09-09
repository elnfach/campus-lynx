import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/config/firebase";

export const useFirestoreData = <T>(path: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(database, path);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData(docSnap.data() as T);
            } else {
                console.log("Document not found!");
            }
            setLoading(false);
        };

        fetchData();
    }, [path]);

    return { data, loading };
};

