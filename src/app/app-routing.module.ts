import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisiteurAccueilComponent } from './visiteur-accueil/visiteur-accueil.component';
import { VisiteurDetailProduitComponent } from './visiteur-detail-produit/visiteur-detail-produit.component';
import { LoginComponent } from './login/login.component';
import { VisiteurEnregistreComponent } from './visiteur-enregistre/visiteur-enregistre.component';
import { SearchComponent } from './search/search.component';
import { DetailPanierComponent } from './detail-panier/detail-panier.component';
import { CommanderComponent } from './commander/commander.component';
import { AuthGuard } from './services/guard-auth/auth.guard';
import { ContactComponent } from './contact/contact.component';
//import { VisiteurAccueilComponent } from './visiteur-accueil/visiteur-accueil.component';

const routes: Routes = [
  {path: '', component: VisiteurAccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: VisiteurEnregistreComponent},

  {path: '#', children: [
    {path: 'produit/#', children: [
      {path: 'detail/:id', component: VisiteurDetailProduitComponent}
    ]},
    {path: 'recherche/:q', component: SearchComponent},
    {path: 'mon-panier', component: DetailPanierComponent, canActivate: [AuthGuard]},
    {path: 'commander', component: CommanderComponent, canActivate: [AuthGuard]},
    {path: 'contact', component: ContactComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
