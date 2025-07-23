import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/config/firebase.ts";

export const useStorageUrl = (path: string) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        getDownloadURL(ref(storage, path)).then(setUrl);
    }, [path]);

    return url;
};
