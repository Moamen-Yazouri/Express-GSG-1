export const removeKey = <T, K extends keyof T>(obj: T, keys: K[]) => {
    const optObject = structuredClone(obj) as Partial<T>;

    for(const key of keys) {
        delete optObject[key];
    }

    const processedObj = optObject as Omit<T, K>;

    return processedObj;
}