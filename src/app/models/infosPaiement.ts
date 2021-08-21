
export class InfosPaiement {

    phoneClient: string;
    montant: string;
    identifierCommande: string;
    urlRedirectApresPaiement: string;
    description?: string;
    token?: string;
    network?: string;

    constructor(phoneClient: string, montant: string, identifierCommande: string, urlRedirectApresPaiement: string, description?: string){
        this.phoneClient = phoneClient;
        this.montant = montant;
        this.identifierCommande = identifierCommande;
        this.urlRedirectApresPaiement = urlRedirectApresPaiement;
        this.description = description;
    }
}