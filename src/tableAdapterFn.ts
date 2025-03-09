export interface TableAdapterFn<T extends { id?: number }> {
    create: (entity: T) => Promise<number>;
    deleteEntity: (entityId: number) => Promise<void>;
    // update: (entityId: number, entity: T) => T;
    updateBy: (entity: T, filterBy: keyof T) => Promise<void>;
    list: (include: { [k in keyof T]?: boolean }) => Promise<T[]>;
    find: (entityId: number) => T | Promise<T | undefined>;
}