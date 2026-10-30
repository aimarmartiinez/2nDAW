export interface Entity {
    id: number;
}

export class Repository<T extends Entity> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getById(id: number): T | undefined {
        for (const item of this.items) {
            if (item.id === id) {
                return item;
            }
        }
        return undefined;
    }

    getAll(): T[] {

        return this.items;
    }

    remove(id: number): boolean {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}