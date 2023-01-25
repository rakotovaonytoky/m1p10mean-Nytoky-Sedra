
import { CarV2 } from "./car-v2";
import { TypeReparation } from "./type-reparation";
import { User } from "./user";

export class Depot {
    _id!: string;
    idCar!: CarV2;
    etat!: number;
    date!: Date;
    description!: string;
    idUser!: User;
    idtypeReparation!: [TypeReparation];

    public constructor(init?: Partial<Depot>) {
        Object.assign(this, init);
    }
}
