import { Categorie } from "./Categorie";
import { Image } from "./Image";
import { Produit } from "./Produit";

export class ProduitImage extends Produit {
    image?: Image;
    categorie?: Categorie;

}