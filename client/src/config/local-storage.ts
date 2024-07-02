export const setLocalStorageItem = (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export const getLocalStorageItem = (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
}

export const removeLocalStorageItem = (name: string) => {
    localStorage.removeItem(name);
}

export const clearAllLocalStorage = () => {
    localStorage.clear();
}