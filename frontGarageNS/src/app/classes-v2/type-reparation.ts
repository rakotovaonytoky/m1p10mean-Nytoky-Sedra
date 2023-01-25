export class TypeReparation {
    _id!: string;
    reference!: number;
    values!: string;
    image!: string;

    public constructor(init?: Partial<TypeReparation>) {
        Object.assign(this, init);
    }
}
