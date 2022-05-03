import { IOwner } from "./IOwner";

export interface INoun {
    id: string;
    body: string;
    background: string;
    accessory: string;
    glass: string;
    hat: string;
    price: string;
    owner: IOwner;
}