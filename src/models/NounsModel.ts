/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOfferor } from '../interfaces/IOfferor';
import { IOwner } from '../interfaces/IOwner';
import { INoun } from '../interfaces/INoun';


export class Noun {

    id: string;
    nounImage: string;
    price: number;
    owner: IOwner;
    offerors: IOfferor[]

    constructor(noun?: INoun) {
        if(!noun) noun = {};
        this.id = noun.id
        this.nounImage = noun.nounImage
        this.price = noun.price
        this.owner = noun.owner
        this.offerors = noun.offerors
    }

    public toJson(): object {
        return {
            id: this.id,
            nounImage: this.nounImage,
            price: this.price,
            owner: this.owner,
            offerors: this.offerors
        };
    }

}