export class Typevalue {
    idType!: number;
    value!: string;
    public constructor(init?: Partial<Typevalue>) {
        Object.assign(this, init);
    }
}
