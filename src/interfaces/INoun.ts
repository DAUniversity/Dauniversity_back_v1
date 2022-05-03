import { IOfferor } from "./IOfferor";
import { IOwner } from "./IOwner";

export interface INoun {
    id?: string;
    body?: string;
    background?: string;
    accessory?: string;
    glass?: string;
    hat?: string;
    price?: number;
    owner?: IOwner;
    offerors?: IOfferor[];
}