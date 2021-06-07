import { Component, OnInit } from '@angular/core';
import { Text } from '../models/Text';
import { Router } from '@angular/router';
import { CommanderService } from '../services/commander/commander.service';

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

  constructor(private commanderService: CommanderService, private route: Router) { }

  ngOnInit(): void {
  }

  choosePay(chooseAverage: string){
    this.chooseAverage = this.choosePayList.find((item) => item === chooseAverage) || "";
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

  onSubmit(){
    this.commander();
  }

}
