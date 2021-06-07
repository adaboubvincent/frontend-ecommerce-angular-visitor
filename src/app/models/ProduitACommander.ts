import { User } from "./User"
import { Panier } from "./Panier";
import { ProduitImage } from "./ProduitImage";
import { Image } from "./Image";

export class ProduitACommander{
    id?: number;
    utilisateur?: User;
    produit?: ProduitImage;
    panier?: Panier;
    quantite?: number;
    estCommander?: boolean;
    image?: Image;
}