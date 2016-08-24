export const saveToStorage = (key, data) => {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        throw err;
    }
}

export const loadFromStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);

        if (!serializedState) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveStateTree = (state) => saveToStorage('state', state);

export const loadStateTree = () => loadFromStorage('state');
