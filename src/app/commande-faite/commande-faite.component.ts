import { Component, OnInit } from '@angular/core';
import { CommanderService } from '../services/commander/commander.service';
import { Router } from '@angular/router';
import { PaiementService } from '../services/paiement/paiement.service';

@Component({
  selector: 'app-commande-faite',
  templateUrl: './commande-faite.component.html',
  styleUrls: ['./commande-faite.component.css']
})
export class CommandeFaiteComponent implements OnInit {
  message = "";
  has_message = false;
  constructor(private route: Router, private commanderService: CommanderService, private paiementService: PaiementService) { }

  ngOnInit(): void {
    this.commander();
  }

  commander(){
    if(localStorage.getItem("identifier") != ""){
      console.log(localStorage.getItem("identifier"));

      var commanderService = this.commanderService;
      var route = this.route;
      $.ajax({
        type: "POST",
        url: "https://paygateglobal.com/api/v2/status/?auth_token=c038a374-b987-475a-abf9-5895f3a56b1b&identifier="+String(localStorage.getItem("identifier")),
        data: JSON.stringify({
          auth_token: "c038a374-b987-475a-abf9-5895f3a56b1b",
          identifier: String(localStorage.getItem("identifier")),
        }),
        success: function (result) {
          console.log(result);
          /* if(result?.status == 0){
            commanderService.commander(localStorage.getItem('token')).subscribe((res: any) => {
              localStorage.setItem("identifier", "")
              localStorage.setItem('pageReload', 'true');
              commanderService.notificationAjouter(res?.text+"\nDate de livraison : "+res?.date_livraison, "success");
              route.navigateByUrl('');
            }, (error:any) => {
              console.log(error.statusText);
              commanderService.notificationAjouter("Impossible de faire cette commande", "danger");
            });
          }else  */if(result?.status == 2){
            commanderService.notificationAjouter("Opération est en cours", "warning");
            route.navigateByUrl('');
          }else if(result?.status == 4){
            commanderService.notificationAjouter("Votre Opération est en expirée", "warning");
            route.navigateByUrl('');
          }else if(result?.status == 6){
            commanderService.notificationAjouter("Votre Opération est annulée", "warning");
            route.navigateByUrl('');
          }else{
            commanderService.notificationAjouter("Cette Opération est impossible", "warning");
            route.navigateByUrl('');
          }
          
        },
        error: function (result, status) {
          commanderService.notificationAjouter("Impossible de faire cette commande!!!", "danger");
        }
        
     });

     
    }else{
      this.commanderService.notificationAjouter("Votre commande est non identifiée", "danger");
    }
    
  }

}
