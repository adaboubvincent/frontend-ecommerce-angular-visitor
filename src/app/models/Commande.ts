import { Panier } from './Panier';
import { Livraison } from './Livraison';
import { ProduitACommander } from './ProduitACommander';

export class Commande {
    id?: number;
    date?: Date;
    pth?: number;
    tva?: number;
    ttc?: number;
    panier?: Panier;
    livraison?: Livraison;
    produitAcommandes?: ProduitACommander[];
    get_prix_total_panier?: number;
    get_prix_total_final_panier?: number;
}
