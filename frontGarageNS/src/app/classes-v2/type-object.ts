export class TypeObject {
    _id!: string;
    reference!: number;
    values!: string;

    public constructor(init?: Partial<TypeObject>) {
        Object.assign(this, init);
    }
}
