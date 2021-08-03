import { Component, OnInit } from '@angular/core';
import { Text } from '../models/Text';
import { Router } from '@angular/router';
import { CommanderService } from '../services/commander/commander.service';
import { Client } from '../models/Client';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.css']
})
export class CommanderComponent implements OnInit {

  choosePayList: Array<string> = [
    "mtn",
    "paypal",
    "visa",
    "mastercard",
    "flooz",
    "tmoney",
    "americanexpress"
  ];
  chooseAverage: string = "mtn";
  client: Client = new Client();
  remplireInfos: boolean = false;

  constructor(private commanderService: CommanderService, private route: Router,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe((res: Client) => {
      this.client = res;
    });
  }

  choosePay(chooseAverage: string){
    this.chooseAverage = this.choosePayList.find((item) => item === chooseAverage) || "";
  }

  commander(){
    
    if(this.client.telephone && this.client.adresse){
      this.remplireInfos = false;
      this.commanderService.commander(localStorage.getItem('token')).subscribe((res: any) => {
        localStorage.setItem('pageReload', 'true');
        this.commanderService.notificationAjouter(res?.text+"\nDate de livraison : "+res?.date_livraison, "success");
        this.route.navigateByUrl('');
      }, (error) => {
        console.log(error.statusText); //Unauthorized
        this.commanderService.notificationAjouter("Impossible de faire cette commande", "danger");
      });
    }else{
      this.remplireInfos = true;
      this.commanderService.notificationAjouter("Veuilez remplir vos informations nécessaire pour la livraison", "warning");
    }
    
  }

  onSubmit(){
    this.commander();
  }

}
