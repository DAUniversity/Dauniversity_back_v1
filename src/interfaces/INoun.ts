import { IOfferor } from "./IOfferor";
import { IOwner } from "./IOwner";

export interface INoun {
    id?: string;
    nounImage?: string;
    offerors?: IOfferor[];
    owner?: IOwner;
    price?: number;
}