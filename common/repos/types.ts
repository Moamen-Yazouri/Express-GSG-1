export interface IBaseMetadata {
  id: string,
  updatedAt: Date,
  createdAt: Date,
}
export interface IBaseRepo<T extends IBaseMetadata> {
    create: (data: Omit<T , "id" | "createdAt" | "updatedAt">) => T,
    findAll: () => T[],
    findById: (id: IBaseMetadata["id"]) => T | undefined,
    findBy: <K extends keyof T>(propName: K, propValue: T[K]) => T | undefined,
    update: (id: IBaseMetadata["id"], data: Partial<T>) => T | undefined,
    delete: (id: IBaseMetadata["id"]) => void
}