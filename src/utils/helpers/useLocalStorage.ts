import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key: string, initialValue: string | object) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(error);
            }
        },
        [key, storedValue],
    );

    useEffect(() => {
        // Update the localStorage value whenever the storedValue changes
        setValue(storedValue);
    }, [key, setValue, storedValue]);

    return [storedValue, setValue];
};

export default useLocalStorage;
