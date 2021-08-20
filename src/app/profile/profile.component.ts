import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/user/security.service';
import { ClientService } from '../services/client/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User';
import { Client } from '../models/Client';
import { FournisseurUser } from '../models/FournisseurUser';
import { FournisseurUserService } from '../services/fournisseur_user/fournisseur-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  formGeneral = this.fb.group({
    username: ['', Validators.required],
    last_name: ['', Validators.required],
    first_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });

  client: Client = new Client();
  fournisseurUser: FournisseurUser = new FournisseurUser();

  formFournisseurUser = this.fb.group({
    nom: ["", Validators.required],
    telephone: [0, Validators.required],
    adresse: ["", Validators.required],
    estPerson: [false, Validators.required]
  });

  formClient = this.fb.group({
    telephone: [0, Validators.required],
    adresse: ["", Validators.required]
  });

  nom: string | null = (localStorage.getItem('last_name')) ? localStorage.getItem('last_name') : "Iconnu";
  prenom: string | null = (localStorage.getItem('first_name')) ? localStorage.getItem('first_name') : "Iconnu";
  email: string | null = (localStorage.getItem('email')) ? localStorage.getItem('email') : "Iconnue";
  role: string | null = (localStorage.getItem('role')) ? localStorage.getItem('role') : "Iconnue";
  
  constructor(private fb: FormBuilder, private securityService: SecurityService,
    private clientService: ClientService, private fournisseurUserService: FournisseurUserService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || "";

    this.formGeneral.get('username')?.setValue(localStorage.getItem('username'));
    this.formGeneral.get('last_name')?.setValue(localStorage.getItem('last_name'));
    this.formGeneral.get('first_name')?.setValue(localStorage.getItem('first_name'));
    this.formGeneral.get('email')?.setValue(localStorage.getItem('email'));
    this.formGeneral.get('role')?.setValue(localStorage.getItem('role'));

    if(this.role == "FOURNISSEUR"){
      this.fournisseurUserService.getFournisseurUser().subscribe((res: FournisseurUser) => {
        this.fournisseurUser = res;
      });
    }else if(this.role == "CLIENT"){
      this.clientService.getClient().subscribe((res: Client) => {
        this.client = res;
      });
    }
    
  }

  submitClient(){
    this.clientService.modifyT("client/compte/", this.client).subscribe((res: Client) => {
      this.client = res;
      this.securityService.notificationAjouter("Vous venez de modifier votre information personnelle!", "success");

      window.location.reload();
    });
  }

  submitFournisseurUser(){
    this.fournisseurUserService.modifyT("fournisseur/compte/", this.fournisseurUser).subscribe((res: FournisseurUser) => {
      this.fournisseurUser = res;
      this.securityService.notificationAjouter("Vous venez de modifier votre information personnelle!", "success");

      window.location.reload();
    });
  }


  submitGeneral(){
    let user = new User();
    user.username = this.formGeneral.get('username')?.value;
    user.email = this.formGeneral.get('email')?.value;
    user.first_name = this.formGeneral.get('first_name')?.value;
    user.last_name = this.formGeneral.get('last_name')?.value;
    user.role = this.formGeneral.get('role')?.value;
    this.securityService.modifyT("utilisateur/"+Number(localStorage.getItem('id'))+"/", user).subscribe((res: User) => {
      let dict = res;
      console.log(dict);
      localStorage.setItem('username', res?.username || "");
      localStorage.setItem('email', res?.email || "");
      localStorage.setItem('first_name', res?.first_name || "");
      localStorage.setItem('last_name', res?.last_name || "");
      localStorage.setItem('role', res?.role || "");

      this.securityService.notificationAjouter("Vous venez de modifier votre information personnelle!", "success");

      window.location.reload();
      
    })
  }

  logout(){
	  this.securityService.logout(localStorage.getItem('token')).subscribe((res) => {
      this.securityService.notificationAjouter("Vous êtes déconnecté maintenant!", "success");
      window.location.reload();
    });
  }

}
