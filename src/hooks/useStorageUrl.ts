import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/config/firebase.ts";

export const useStorageUrl = (path: string) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const cachedUrl = localStorage.getItem(`firebase:${path}`);
        const cachedTime = localStorage.getItem(`firebase:${path}:time`);

        if (cachedUrl && cachedTime && Date.now() - Number(cachedTime) < 86400000) {
            setUrl(cachedUrl);
        } else {
            getDownloadURL(ref(storage, path)).then((url) => {
                setUrl(url);
                localStorage.setItem(`firebase:${path}`, url);
                localStorage.setItem(`firebase:${path}:time`, Date.now().toString());
            });
        }
    }, [path]);

    return url;
};
