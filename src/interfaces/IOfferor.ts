import { IOwner } from "./IOwner";

export interface IOfferor {
    id?: string;
    owner?: IOwner;
    price?: number;
}