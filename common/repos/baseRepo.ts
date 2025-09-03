import { IBaseMetadata, IBaseRepo } from "./types";

export default class BaseRepo<T extends IBaseMetadata> implements IBaseRepo<T> {
    private items: T[];
    private idCounter: number;

    constructor(items: T[]) {
        this.items = items;
        this.idCounter = items.length;
    }

    findById(id: IBaseMetadata["id"]) {
        const foundedItem = this.items.find((i) => (i.id === id));
        return foundedItem;
    };
    
    findBy<K extends keyof T>(propName: K, propValue: T[K]) {
        return this.items.find((i) => i[propName] === propValue)
    }

    findAll() {
        return this.items;
    }
    create(data: Omit<T, keyof IBaseMetadata>) {
        const firstLettter = this.items[0]?.id.charAt(0) || 'i'
        const newItem: T = {
            ...data,
            id: String(firstLettter + ++this.idCounter),
            createdAt: new Date(),
            updatedAt: new Date(),
        } as unknown as T; 
        this.items.push(newItem);
        return newItem;
    }

    delete(id: string) {
        
        const allExcludeDeleted: T[] = this.items.filter((u) => (u.id !== id));
        this.items = allExcludeDeleted;

        return true;
    }

    update(id: string, data: Partial<T>): T | undefined {

    const userIndex = this.items.findIndex((user) => user.id === id);
        if (userIndex === -1) return undefined;

        const newUser: T = {...this.items[userIndex], ...data} as T
        this.items[userIndex] = newUser;
        return this.items[userIndex];
    }
}

