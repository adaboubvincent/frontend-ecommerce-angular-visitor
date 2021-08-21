import { Component, OnInit } from '@angular/core';
import { CommanderService } from '../services/commander/commander.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-faite',
  templateUrl: './commande-faite.component.html',
  styleUrls: ['./commande-faite.component.css']
})
export class CommandeFaiteComponent implements OnInit {

  constructor(private route: Router, private commanderService: CommanderService) { }

  ngOnInit(): void {
    this.commander();
  }

  commander(){

      this.commanderService.commander(localStorage.getItem('token')).subscribe((res: any) => {
        localStorage.setItem('pageReload', 'true');
        this.commanderService.notificationAjouter(res?.text+"\nDate de livraison : "+res?.date_livraison, "success");
        this.route.navigateByUrl('');
      }, (error) => {
        console.log(error.statusText); //Unauthorized
        this.commanderService.notificationAjouter("Impossible de faire cette commande", "danger");
      });
    
  }

}
