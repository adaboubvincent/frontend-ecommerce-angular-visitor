
export class InfosPaiement {

    phone_number: string;
    amount: string;
    identifier: string;
    auth_token: string;
    description?: string;
    network?: string;

    constructor(auth_token: string, amount: string, phone_number:string, identifier: string, network:string,
            description?: string){
        this.phone_number = phone_number;
        this.amount = amount;
        this.identifier = identifier;
        this.auth_token = auth_token;
        this.description = description;
        this.network = network;
    }
}