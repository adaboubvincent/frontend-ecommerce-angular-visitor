import { Categorie } from "./Categorie";
import { Fournisseur } from "./Fournisseur";

export class Produit {
    public id?: number;
    public nom?: string;
    public prix?: number;
    public diminu_price?: number;
    public caracteristique?: string;
    public quantite: number = 0;
    public categories?: Categorie[] = [];
    public fournisseur?: Fournisseur;

}