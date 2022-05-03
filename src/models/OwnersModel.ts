/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOwner } from '@/interfaces/IOwner';


export class Owner {

    id: string;
    wallet: string;
    walletShort: string;

    constructor(owner?: IOwner) {
        this.id = owner.id
        this.wallet = owner.wallet
        this.walletShort = owner.walletShort
    }

    public toJson(): object {
        return {
            id: this.id,
            wallet: this.wallet,
            walletShort: this.walletShort,
        };
    }

}