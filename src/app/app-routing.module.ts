import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisiteurAccueilComponent } from './visiteur-accueil/visiteur-accueil.component';
import { FournisseurAjoutProduitComponent } from './fournisseur-ajout-produit/fournisseur-ajout-produit.component';
import { FornisseurListProduitComponent } from './fornisseur-list-produit/fornisseur-list-produit.component';
import { VisiteurDetailProduitComponent } from './visiteur-detail-produit/visiteur-detail-produit.component';
import { LoginComponent } from './login/login.component';
import { VisiteurEnregistreComponent } from './visiteur-enregistre/visiteur-enregistre.component';
import { SearchComponent } from './search/search.component';
import { DetailPanierComponent } from './detail-panier/detail-panier.component';
import { CommanderComponent } from './commander/commander.component';
import { AuthGuard } from './services/guard-auth/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
//import { VisiteurAccueilComponent } from './visiteur-accueil/visiteur-accueil.component';

const routes: Routes = [
  {path: '', component: VisiteurAccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: VisiteurEnregistreComponent},
  {path: 'profile', children: [ 
    {path: '', component: ProfileComponent},
    {path: 'ajouter-produit', component: FournisseurAjoutProduitComponent},
    {path: 'produit/modifier/:id', component: FournisseurAjoutProduitComponent},
    {path: 'list-produit', component: FornisseurListProduitComponent}
  ], canActivate: [AuthGuard]},

  {path: '#', children: [
    {path: 'produit/#', children: [
      {path: 'detail/:id', component: VisiteurDetailProduitComponent}
    ]},
    {path: 'recherche/:q', component: SearchComponent},
    {path: 'mon-panier', component: DetailPanierComponent, canActivate: [AuthGuard]},
    {path: 'commander', component: CommanderComponent, canActivate: [AuthGuard]},
    {path: 'contact', component: ContactComponent}
  ]},
  {path: 'confirmation/email', component: EmailConfirmationComponent},
  {path: 'reinitialisation/mot_de_passe', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
