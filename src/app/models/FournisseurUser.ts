import { User } from './User';
import { Fournisseur } from './Fournisseur';


export class FournisseurUser extends Fournisseur {
    public activer?: boolean;
    public utilisateur?: User;
}


