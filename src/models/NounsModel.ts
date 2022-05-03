/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOwner } from '@/interfaces/IOwner';
import { INoun } from '../interfaces/INoun';


export class Noun {

    id: string;
    body: string;
    background: string;
    accessory: string;
    glass: string;
    hat: string;
    price: string;
    owner: IOwner; //

    constructor(noun?: INoun) {
        this.id = noun.id
        this.body = noun.body
        this.background = noun.background
        this.accessory = noun.accessory
        this.glass = noun.glass
        this.hat = noun.hat
        this.price = noun.price
        this.owner = noun.owner
    }

    public toJson(): object {
        return {
            id: this.id,
            body: this.body,
            background: this.background,
            accessory: this.accessory,
            glass: this.glass,
            hat: this.hat,
            price: this.price,
            owner: this.owner
        };
    }

}