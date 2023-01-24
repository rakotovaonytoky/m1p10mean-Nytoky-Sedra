import { TypeObject } from "./type-object";

export class CarV2 {
    _id!: string;
    typeCar!: TypeObject;
    colorCar!: string;
    markCar!: TypeObject;
    modelCar!: string;
    matricule!: string;
    proprietaire!: string;
    anneDeSortie!: number;
    public constructor(init?: Partial<CarV2>) {
        Object.assign(this, init);
    }
}
