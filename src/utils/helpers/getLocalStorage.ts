import { useState, useEffect, useCallback } from "react";

const useLocalStorageHelper = <TData>(key: string, initialValue?: TData) => {
    const [storedValue, setStoredValue] = useState<TData>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: TData) => {
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

export default useLocalStorageHelper;
