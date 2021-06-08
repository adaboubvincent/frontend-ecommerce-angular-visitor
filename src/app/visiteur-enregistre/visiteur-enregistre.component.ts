import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Panier } from '../models/Panier';
import { User } from '../models/User';
import { PanierService } from '../services/panier/panier.service';
import { SecurityService } from '../services/user/security.service';

@Component({
  selector: 'app-visiteur-enregistre',
  templateUrl: './visiteur-enregistre.component.html',
  styleUrls: ['./visiteur-enregistre.component.css']
})
export class VisiteurEnregistreComponent implements OnInit {

  formRegister = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  });
  passwordNotMatch: boolean = false;
  constructor(private fb: FormBuilder, private securityService: SecurityService, 
    private route: Router) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.formRegister.get('password1')?.value === this.formRegister.get('password2')?.value){
      this.passwordNotMatch = false;
      let user = new User();
      user.username = this.formRegister.get('username')?.value;
      user.email = this.formRegister.get('email')?.value;
      user.password1 = this.formRegister.get('password1')?.value;
      user.password2 = this.formRegister.get('password2')?.value;
      this.securityService.register(user).subscribe((res) => {
        let dict = res;
        console.log(dict);
        localStorage.setItem('id', ""+res.user?.id || "0");
        localStorage.setItem('token', res.token || "");
        localStorage.setItem('username', res.user?.username || "");
        localStorage.setItem('email', res.user?.email || "");
        localStorage.setItem('first_name', res.user?.first_name || "");
        localStorage.setItem('last_name', res.user?.last_name || "");
        localStorage.setItem('is_superuser', ""+res.user?.is_superuser || "");
        localStorage.setItem('pageReload', 'true');
  
        this.securityService.notificationAjouter("Vous avez un compte maintenant!", "success");
        this.route.navigateByUrl('');
  
        /* let panier = new Panier();
        panier.utilisateur = res.user;
        panier.estCommander = false;
        this.panierService.addT("ajout-panier/", panier).subscribe((res : Panier) => {
          localStorage.setItem('idPanier', ""+res.id || "");
        }); */
      });
    }else{
      this.passwordNotMatch = true;
      this.securityService.notificationAjouter("Les mots de passe doivent être les mêmes!", "warning");
    }
    
  }

}
