export class TypeReparation {
    idType!: number;
    value!: string;
    img!: string;
    public constructor(init?: Partial<TypeReparation>) {
        Object.assign(this, init);
    }
}
