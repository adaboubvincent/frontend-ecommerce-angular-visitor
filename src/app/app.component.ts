import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'frontendECommerce';

  isAdminPage: string | null = "";

  ngOnInit(): void {
    this.isAdminPage = localStorage.getItem('admin');
    console.log("Admin => "+this.isAdminPage);
  }

  ngOnDestroy(){
    this.isAdminPage = localStorage.getItem('admin');
    console.log("Admin => "+this.isAdminPage);
  }


}
