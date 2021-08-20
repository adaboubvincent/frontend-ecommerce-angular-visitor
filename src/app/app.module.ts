import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
//import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product/product.service';
import { FournisseurService } from './services/fournisseur/fournisseur.service';
import { CategoryService } from './services/category/category.service';
import { LoginComponent } from './login/login.component';
import { VisiteurAccueilComponent } from './visiteur-accueil/visiteur-accueil.component';
import { VisiteurEnregistreComponent } from './visiteur-enregistre/visiteur-enregistre.component';
import { VisiteurBaseComponent } from './visiteur-base/visiteur-base.component';
import { VisiteurDetailProduitComponent } from './visiteur-detail-produit/visiteur-detail-produit.component';
import { SearchComponent } from './search/search.component';
import { DetailPanierComponent } from './detail-panier/detail-panier.component';
import { CommanderComponent } from './commander/commander.component';
import { ContactComponent } from './contact/contact.component';
import { SecurityService } from './services/user/security.service';
import { AuthGuard } from './services/guard-auth/auth.guard';
import { TokenInterceptorService } from './services/guard-auth/token-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { EmailService } from './services/email/email.service';
import { PaiementService } from './services/paiement/paiement.service';
import { CommandeFaiteComponent } from './commande-faite/commande-faite.component';
import { FournisseurAjoutProduitComponent } from './fournisseur-ajout-produit/fournisseur-ajout-produit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FornisseurListProduitComponent } from './fornisseur-list-produit/fornisseur-list-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisiteurAccueilComponent,
    VisiteurEnregistreComponent,
    VisiteurBaseComponent,
    VisiteurDetailProduitComponent,
    SearchComponent,
    DetailPanierComponent,
    CommanderComponent,
    ContactComponent,
    ProfileComponent,
    EmailConfirmationComponent,
    CommandeFaiteComponent,
    FournisseurAjoutProduitComponent,
    ResetPasswordComponent,
    FornisseurListProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [
    ProductService,
    FournisseurService,
    CategoryService,
    SecurityService,
    EmailService,
    PaiementService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
