import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../services/user/security.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formResetPassword = this.fb.group({
    password1: ['',Validators.required],
    password2: ['',Validators.required]
  });
  uidb64: string = "";
  token: string = "";
  erreur_message = ""
  constructor(private fb: FormBuilder, private routerActive: ActivatedRoute, private securityService: SecurityService,
   private route: Router) {
    this.routerActive.queryParams
      .subscribe(params => {
        if(params.uidb64 || params.token) {
          this.uidb64 = params.uidb64;
          this.token = params.token;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  submitResetPassword(){
    this.securityService.reset_password(
      this.formResetPassword.get('password1')?.value,
      this.formResetPassword.get('password2')?.value,
      this.uidb64,
      this.token
      ).subscribe((res) => {
      
      this.securityService.notificationAjouter(res?.test || "" , "success");
      this.route.navigateByUrl('login');
      
    }, (error) => {
      this.erreur_message = error?.error?.test;
      this.securityService.notificationAjouter(error?.error?.test || "" , "warning");
    });
    
    
  }

  isActive: boolean = true;
  eye(){
    this.isActive = !this.isActive;
  }


}
