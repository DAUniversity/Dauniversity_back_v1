/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOfferor } from '../interfaces/IOfferor';
import { IOwner } from '../interfaces/IOwner';


export class Offeror {

    id: string;
    owner: IOwner;
    price: number;

    constructor(offeror?: IOfferor) {
        if(!offeror) offeror = {};
        this.id = offeror.id
        this.owner = offeror.owner
        this.price = offeror.price
    }

    public toJson(): object {
        return {
            id: this.id,
            owner: this.owner,
            price: this.price,
        };
    }

}