import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertMessage, NanaAlertService } from './Shared/nana-alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private alertService: NanaAlertService) { }

  ngOnInit() {
    //this.alertService.alerts$.subscribe((alert: any) => {
    //  this.alertService.info(alert)
    //});
  }


 

  title = 'ecomadmin.client';
}
