export class User {
    _id!: string;
    name!: string;
    email!: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
