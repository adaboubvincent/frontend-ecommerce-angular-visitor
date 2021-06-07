import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '../services/user/security.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loadingPage: boolean = false;

  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private securityService: SecurityService, private route: Router, private location: Location) {
   }

  ngOnInit(): void {

  }

  submit(){
    let user = new User();
    user.username = this.formLogin.get('username')?.value;
    user.password = this.formLogin.get('password')?.value;
    this.securityService.login(user).subscribe((res) => {
      let dict = res;
      console.log(dict);
      localStorage.setItem('token', res.token || "");
      localStorage.setItem('username', res.user?.username || "");
      localStorage.setItem('email', res.user?.email || "");
      localStorage.setItem('is_superuser', ""+res.user?.is_superuser || "");
      localStorage.setItem('pageReload', 'true');
      this.securityService.notificationAjouter("Vous êtes connecté maintenant!", "success");
      
      //this.location.replaceState('/');
      //window.location.reload();
      //this.route.navigate(['']);
      this.route.navigateByUrl('');
      
      
    }, (error) => {
      this.securityService.notificationAjouter("Identifiants incorrects", "danger");
    });
    
    
  }



}
