export class User {
    _id!: string;
    name!: number;
    email!: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
