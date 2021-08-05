import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/email/email.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(private routerActive: ActivatedRoute, private emailConfirmationService: EmailService, private route: Router) { }

  ngOnInit(): void {

    this.routerActive.queryParams
      .subscribe(params => {
        if(params.uidb64 || params.token) {
          
          this.emailConfirmationService.confirmation_email(params.uidb64, params.token).subscribe((res) => {
            this.emailConfirmationService.notificationAjouter(res?.test || "" , "success");

            setTimeout(() => {
              this.route.navigateByUrl('login');
            }, 4000);

          });



        }
      }
    );



  }

}
