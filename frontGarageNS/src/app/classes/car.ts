export class Car {
    vType!: any;
    vColor!: string;
    brand!: string;
    model!: string;
    licensePlate!: string;
    owner!: string;
    year!: number;
    public constructor(init?: Partial<Car>) {
        Object.assign(this, init);
    }
}
